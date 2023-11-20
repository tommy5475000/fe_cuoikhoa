import fetcher from "./fetcher";

// GET LIST COMMENTS
export async function getComment(page) {
    try {
      const response = await fetcher.get("/binh-luan" );
      return response.data.content;
    } catch (error) {
      throw error.response.data.content;
    }
  }

  //DELETE COMMENTS
export const deleteComment = async (id) => {
    try {
      const response = await fetcher.delete(`/binh-luan/${id}`);
      return response.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  };

  //UPDATA COMMENTS
export const UpComment = async (id) => {
    try {
      const response = await fetcher.put(`/binh-luan/${id}`);
      return response.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  };

  //ADD COMMENTS
export const AddNewComment = async (payload) => {
    try {
      const response = await fetcher.post("/binh-luan/",payload);
      return response.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  };