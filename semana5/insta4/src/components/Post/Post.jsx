import React from "react";
import "./Post.css";

import { IconeComContador } from "../IconeComContador/IconeComContador";
import ShareToButton from "../ShareToButton/ShareToButton.jsx";

import iconeCoracaoBranco from "../../img/favorite-white.svg";
import iconeCoracaoPreto from "../../img/favorite.svg";
import iconeComentario from "../../img/comment_icon.svg";
import { SecaoComentario } from "../SecaoComentario/SecaoComentario";
import bookmarkIconBlack from "../../img/bookmark-24px.svg";
import bookmarkIconWhite from "../../img/bookmark_border-24px.svg";
import shareIcon from "../../img/share-24px.svg";
import facebook from "../../img/facebook.png";
import instagram from "../../img/instagram.png";
import twitter from "../../img/twitter.png";

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curtido: false,
      numeroCurtidas: 0,
      comentando: false,
      bookmarked: false,
      sharing: false,
      shareMsg: "",
      comments: []
    };
  }

  onClickCurtida = () => {
    let val = this.state.curtido ? -1 : 1;
    this.setState({
      curtido: !this.state.curtido,
      numeroCurtidas: this.state.numeroCurtidas + val
    });
  };

  onClickComentario = () => {
    this.setState({
      comentando: !this.state.comentando
    });
  };

  onClickBookmark = () => {
    this.setState({
      bookmarked: !this.state.bookmarked
    });
  };

  onClickShare = () => {
    this.setState({
      sharing: !this.state.sharing
    });
  };

  closeShare = () => {
    this.setState({
      sharing: false
    });
  };

  shareTo = to => {
    alert(
      "Post compartilhado no " + to + " com a mensagem: " + this.state.shareMsg
    );
    this.setState({
      shareMsg: "",
      sharing: false
    });
  };

  aoEnviarComentario = comment => {
    if (comment !== "") {
      this.setState({
        comments: [...this.state.comments, comment]
      });
    }
    this.setState({
      comentando: false
    });
  };

  handleShareMsg = event => {
    this.setState({
      shareMsg: event.target.value
    });
  };

  render() {
    let iconeCurtida = this.state.curtido
      ? iconeCoracaoPreto
      : iconeCoracaoBranco;

    let componenteComentario = this.state.comentando ? (
      <div>
        <hr />
        {this.state.comments.map(comment => (
          <p className="post-comment">{comment}</p>
        ))}
        <SecaoComentario aoEnviar={this.aoEnviarComentario} />
      </div>
    ) : null;

    let bookMarkIcon = this.state.bookmarked
      ? bookmarkIconBlack
      : bookmarkIconWhite;

    return (
      <div className={"post-container"}>
        <div className={"post-header"}>
          <img
            className={"user-photo"}
            src={this.props.fotoUsuario}
            alt={"Imagem do usuario"}
          />
          <p>{this.props.nomeUsuario}</p>
        </div>

        <div className="post-main">
          <div
            style={{
              bottom: this.state.sharing ? "0" : "-100%"
            }}
            className="share-menu"
          >
            <div className="btn-wrapper">
              <ShareToButton
                image={facebook}
                onShareBtn={() => this.shareTo("Facebook")}
              />
              <ShareToButton
                image={twitter}
                onShareBtn={() => this.shareTo("Twitter")}
              />
              <ShareToButton
                image={instagram}
                onShareBtn={() => this.shareTo("Instagram")}
              />
            </div>
            <textarea
              style={{
                resize: "none"
              }}
              value={this.state.shareMsg}
              onChange={this.handleShareMsg}
              name=""
              id=""
              cols="24"
              rows="3"
              placeholder="Comment..."
            ></textarea>
            <div onClick={this.closeShare} className="share-close-btn">
              <div className="bar1"></div>
              <div className="bar2"></div>
            </div>
          </div>
          <img
            className={"post-photo"}
            src={this.props.fotoPost}
            alt={"Imagem do post"}
          />
        </div>

        <div className={"post-footer"}>
          <IconeComContador
            icone={iconeCurtida}
            onClickIcone={this.onClickCurtida}
            valorContador={this.state.numeroCurtidas}
            contador={true}
          />

          <IconeComContador
            icone={bookMarkIcon}
            onClickIcone={this.onClickBookmark}
          />

          <IconeComContador
            icone={shareIcon}
            onClickIcone={this.onClickShare}
          />

          <IconeComContador
            icone={iconeComentario}
            onClickIcone={this.onClickComentario}
            valorContador={this.state.comments.length}
            contador={true}
          />
        </div>
        {componenteComentario}
      </div>
    );
  }
}

export default Post;
