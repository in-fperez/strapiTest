import axiosInstance from '../src/utils/axiosInstance';


const calculationsRequest = {
    getCalculations: async () => {
        const data = await axiosInstance.get(`/prueba-react/calculations`);
        return data;
    },
};

export default calculationsRequest;