import HomeNavbar from "./HomeNavbar";

const HomeContent = () => {
  return (
    <>
      <HomeNavbar />
      <section className="home">
        <main className="home__intro">
          <h1>Welcome</h1>
          <p>One Stop for All your Passwords</p>
          <p>Forget About Passwords We will take care of it</p>
          <p>Don't worry regarding the Storage 😉</p>
          <button>Read More !!</button>
        </main>
      </section>
    </>
  );
};

export default HomeContent;
