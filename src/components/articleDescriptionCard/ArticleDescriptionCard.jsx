import "./ArticleDescription.scss";

const ArticleDescriptionCard = ({ overview }) => {
  return (
    <div className="article-description">
      <div dangerouslySetInnerHTML={{ __html: overview }} />
    </div>
  );
};

export default ArticleDescriptionCard;