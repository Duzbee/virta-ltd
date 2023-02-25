import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import CountryList, { COUNTRY_RESOLVER_QUERY } from "./CountryList";
import "@testing-library/jest-dom/extend-expect";

const mockCountries = [
  {
    code: "US",
    name: "United States",
    iso3: "USA",
    otpInAppEnabled: true,
    dialCode: "+1",
    defaultTimezone: "America/New_York",
  },
  {
    code: "GB",
    name: "United Kingdom",
    iso3: "GBR",
    otpInAppEnabled: false,
    dialCode: "+44",
    defaultTimezone: "Europe/London",
  },
];

const mockSuccessResponse: MockedResponse = {
  request: {
    query: COUNTRY_RESOLVER_QUERY,
  },
  result: {
    data: {
      countryResolver: mockCountries,
    },
  },
};

const mockErrorResponse: MockedResponse = {
  request: {
    query: COUNTRY_RESOLVER_QUERY,
  },
  error: new Error("Error fetching data"),
};

describe("CountryList component", () => {
  it("should render a list of countries", async () => {
    render(
      <MockedProvider mocks={[mockSuccessResponse]} addTypename={false}>
        <CountryList />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      mockCountries.forEach((country) => {
        expect(screen.getByText(country.name)).toBeInTheDocument();
      });
    });
  });

  it("should handle error from Apollo Client", async () => {
    render(
      <MockedProvider mocks={[mockErrorResponse]} addTypename={false}>
        <CountryList />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(screen.queryByText(/Error :\(/)).toBeInTheDocument();
    });
  });
});
