import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br
          className="max-md:hidden
      "
        />
        <span className="orange_gradient text-center">AI-Powred Promts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source Ai prompting tool for modern word to discover, create and share
        creative prompts
      </p>
      {/* Feed Component  */}
      <Feed />
    </section>
  )
}

export default Home
