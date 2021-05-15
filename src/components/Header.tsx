const HeaderComponent = (props: { title: string; subtitle?: string }) => {
  return (
    <header className="hero is-info">
      <div className="hero-body">
        <h1 className="title">{props.title}</h1>
        {props.subtitle && <p className="subtitle">{props.subtitle}</p>}
      </div>
    </header>
  );
};

export default HeaderComponent;
