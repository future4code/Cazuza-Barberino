import React from "react";
import styled, { css } from "styled-components";
import { DefaultBox } from "../global-styled";

interface Props {
  label?: string;
  fontSize?: string;
  name: string;
  value: string;
  changeHandler: (e: any) => void;
  onChangeValidation?: (inputValue: string) => [boolean, string];
  onBlurValidation?: {
    onError: (name: string, error: boolean) => void;
    validations: Array<(inputValue: string) => [boolean, string]>;
  };
}

const InputField = ({
  name,
  value,
  changeHandler,
  label,
  fontSize,
  onChangeValidation,
  onBlurValidation,
}: Props) => {
  const [showLabel, setShowLabel] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeValidation && !onChangeValidation(e.target.value)[0]) return;
    changeHandler(e);
  };

  const handleBlur = () => {
    if (onBlurValidation) {
      let errArray: string[] = [];
      onBlurValidation.validations.forEach((validation) => {
        const [valid, errorMsg] = validation(value);
        if (!valid) errArray.push((label || name) + " " + errorMsg);
      });
      setErrors(errArray);
      onBlurValidation.onError(name, errArray.length > 0);
    }
    setShowLabel(value.trim() !== "");
  };

  return (
    <Container>
      <Wrapper>
        <Input
          as="input"
          onFocus={() => setShowLabel(true)}
          onBlur={handleBlur}
          fontSize={fontSize}
          name={name}
          value={value}
          onChange={handleChange}
          error={errors.length > 0}
        />
        <Inputlabel fontSize={fontSize} showLabel={showLabel}>
          {label}
        </Inputlabel>
      </Wrapper>
      {errors.map((error) => (
        <ErroMsg fontSize={fontSize}>{error}</ErroMsg>
      ))}
    </Container>
  );
};

interface InputProps {
  error: boolean;
}

const Input = styled(DefaultBox)<InputProps>`
  background-color: ${(props) => props.theme.light};

  ${(props) =>
    props.error &&
    css`
      border-color: red;
    `}
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ErroMsg = styled(DefaultBox)`
  color: red;
  border: none;
  font-size: 0.8em;
`;

interface InputlabelProps {
  showLabel: boolean;
  fontSize?: string;
}

const Inputlabel = styled.label.attrs((props: InputlabelProps) => ({
  fontSize: props.fontSize || "20px",
  showLabel: props.showLabel,
}))`
  position: absolute;
  left: 1em;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.light};
  padding: 0.2em;
  transition: 0.2s;
  pointer-events: none;
  opacity: 0.5;

  ${(props) =>
    props.showLabel &&
    css`
      top: 0;
      font-size: 0.75em;
      opacity: 1;
    `};
`;

export default InputField;
