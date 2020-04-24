import React from "react";
import styled, { css } from "styled-components";
import { DefaultBox } from "../global-styled";

export interface FormField {
  name: string;
  label?: string;
  initialValue?: string;
  validations?: Array<(inputValue: string) => [boolean, string]>;
  type?: "input" | "textarea" | "select";
  options?: string[];
}

interface Props {
  field: FormField;
  fontSize?: string;
  value: string;
  errors: string[];
  label: string;
  changeHandler: (value: string) => void;
  checkForErrors: (label: string) => void;
  onChangeValidation?: (inputValue: string) => [boolean, string];
}

const InputField = ({
  field,
  value,
  changeHandler,
  fontSize,
  onChangeValidation,
  errors,
  checkForErrors,
  label,
}: Props) => {
  const [showLabel, setShowLabel] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeValidation && !onChangeValidation(e.target.value)[0]) return;
    changeHandler(e.target.value);
  };

  const getOptions = React.useCallback(() => {
    const arr = (field.options as string[]).map((option) => (
      <option value={option}>{option}</option>
    ));
    arr.push(<option hidden selected disabled></option>);
    return arr;
  }, [field.options]);

  const handleBlur = () => {
    checkForErrors(label);
    setShowLabel(value.trim() !== "");
  };

  return (
    <Container>
      <Wrapper>
        <Input
          as={field.type || "input"}
          onFocus={() => setShowLabel(true)}
          onBlur={handleBlur}
          fontSize={fontSize}
          name={field.name}
          value={value}
          onChange={handleChange}
          error={errors.length > 0}
        >
          {field.options ? getOptions() : null}
        </Input>
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
