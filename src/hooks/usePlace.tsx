import { StrapiApi } from "utils/backendApi";
import { useQuery } from "@tanstack/react-query";
import { TPlaces } from "types/places";

export const useGetPlaces = (page: number) => {
  const getPlaces = async (): Promise<TPlaces> => {
    const response = await StrapiApi.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/places?populate=*&pagination[page]=${page}&pagination[pageSize]=8`
    );
    return response.data;
  };

  const {
    data: places,
    isLoading,
    isError,
  } = useQuery(["places", page], getPlaces, {
    onSuccess: ({ data }) => {
      return data;
    },
  });
  return { places, isLoading, isError };
};

export const useAddPlace = () => {};
