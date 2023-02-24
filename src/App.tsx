import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CountryList from "./CountryList";
import Header from "./Header";
import bgImage from "./assets/images/bg-image.svg";

const client = new ApolloClient({
  uri: "https://admin-core.test.virtaglobal.com/public",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="min-h-screen bg-none md:bg-main-background bg-no-repeat bg-right-bottom">
      <Header />
      <ApolloProvider client={client}>
        <div className="px-4 py-6 md:py-16 md:px-80">
          <h1 className="font-bold text-[54px] hidden md:block mb-10">Compatible countries</h1>
          <CountryList />
        </div>
      </ApolloProvider>
      {/* <img className="absolute right-0 bottom-0" src={bgImage} /> */}
    </div>
  );
}

export default App;
