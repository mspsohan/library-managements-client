import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import useAxios from "./useAxios";

const useCategory = () => {
   const axios = useAxios()
   const { data, isLoading, refetch } = useQuery({
      queryKey: ['category'],
      queryFn: async () => {
         const response = await axios.get('/categories');
         return response.data;
      }
   })
   return { data, isLoading, refetch }
}
export default useCategory;