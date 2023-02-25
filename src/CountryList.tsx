import { useQuery, gql } from "@apollo/client";
import { CheckmarkFilled, Misuse } from "@carbon/icons-react";

export type Country = {
  code: string;
  name: string;
  iso3: string;
  otpInAppEnabled: boolean;
  dialCode: string;
  defaultTimezone: string;
};

export const COUNTRY_RESOLVER_QUERY = gql`
  {
    countryResolver {
      code
      name
      iso3
      otpInAppEnabled
      dialCode
      defaultTimezone
    }
  }
`;

function CountryList() {
  const { loading, error, data } = useQuery<{ countryResolver: Country[] }>(COUNTRY_RESOLVER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const countries = data?.countryResolver ?? [];

  return (
    <div className="relative space-y-2 max-w-2xl md:max-h-[31rem] md:overflow-y-auto md:scrollbar-hide">
      {countries.map((country) => (
        <div className="bg-white relative px-[16px] py-[8px] flex items-center" key={country.code}>
          <div className={`w-1 h-[75%] rounded-r-full absolute left-0 ${country.otpInAppEnabled ? "bg-green-custom" : "bg-red-custom"}`}></div>
          <div className="w-full flex justify-between items-center">
            <div className="flex space-x-4">
              <img className="w-6" src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`} />
              <div className="flex flex-col">
                <div className="text-black-custom">{country.name}</div>
                <div className="text-gray-custom">Timezone {country.defaultTimezone}</div>
                <div className="md:hidden text-gray-custom">Country code: {country.code}</div>
              </div>
            </div>
            <div className="flex">
              <div className="hidden md:block text-gray-custom">Country code: {country.code}</div>
              {country.otpInAppEnabled ? <CheckmarkFilled size={24} className="ml-4 text-green-custom" /> : <Misuse size={24} className="ml-4 text-red-custom" />}
            </div>
          </div>
        </div>
      ))}
      <div className="hidden md:block h-10 w-full bg-gradient-to-t from-[#d4d9de] to-transparent sticky bottom-0"></div>
    </div>
  );
}

export default CountryList;
