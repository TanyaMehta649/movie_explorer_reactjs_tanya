import axios from 'axios';
 interface SignupPayload{
  name: string,
  email:string,
  mobile_number:string,
  password:string,
  password_confirmation: string, 
};



export const signupApiCall = (payload: SignupPayload) => {
  console.log('Payload being sent: ', payload);
  const signUpPayload = {
    user:{
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
      name: payload.name,
      mobile_number: payload.mobile_number,
    }
  }

  return axios
    .post(
      'https://movie-explorer-app.onrender.com/users',
      signUpPayload
    )
    .then((response) => {
      console.log('Signup Response: ', response.data);
      return response.data;
    })
    .catch((error) => {
        if (error.response && error.response.data) {
          console.error("Signup Error: ", error.response.data);
          alert(`Signup failed: ${JSON.stringify(error.response.data.errors || error.response.data)}`);
        } else {
          console.error("Signup Error: ", error.message);
        }
        return null;
      });
    };      

interface loginPayload {
    email: string;
    password: string;
}



export const loginApiCall = async (payload: { email: string, password: string }) => {
  const { email, password } = payload;
  console.log("login payload", payload);

  try {
      const response = await axios.post(`https://movie-explorer-app.onrender.com/users/sign_in`,
        { 
          user: {email, password}
        },
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          }
      );
      console.log("login response",response.data);
    localStorage.setItem("token", response?.data?.token);
console.log("Saved token:", response?.data?.token);

      localStorage.setItem("user", JSON.stringify(response?.data));
      const userResponse : UserResponse ={
        ...response.data,
      }

      return userResponse;
  }
  catch (error) {
      console.log("Error Occurred while Signing In: ", error);
  }
}

export interface Movie {
  id: number;
  title: string;
  genre: string;
  release_year: number;
  rating: number;
  director: string;
  duration: number;
  description: string;
  premium: boolean;
  poster_url: string;
  banner_url: string;
} 

export const getAllMovies = async()=>{
  try{
      const response = await axios.get('https://movie-explorer-app.onrender.com/api/v1/movies',
          {
              headers:{
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          });
          const movies : Movie[] = response.data;
          console.log("fetched movies", movies);

          return movies;
  }
  catch(error : any){
      console.log("error ", error.message);
  }
}

export const getMovieById = async (id: number) => {
  try {
    const response = await axios.get(`https://movie-explorer-app.onrender.com/api/v1/movies/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const movie: Movie = response.data;
    console.log("Fetched movie by ID", movie);
    return movie;
  } catch (error: any) {
    console.log("Error fetching movie by ID", error.message);
  }
}



interface UserData {
  token?: string;
}


interface ApiErrorResponse {
  message?: string;
}

export const sendTokenToBackend = async (deviceToken: string): Promise<any> => {
  try {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      throw new Error('No authentication token found. User might not be logged in.');
    }

    console.log('Sending FCM device token to backend:', deviceToken);
    console.log('Using auth token:', authToken);

    const response = await fetch('https://movie-explorer-app.onrender.com/api/v1/update_device_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ device_token: deviceToken }),
    });

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json().catch(() => ({}));
      throw new Error(`Failed to send device token: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Device token sent to backend successfully:', data);
    return data;
  } catch (error) {
    console.error('Error sending device token to backend:', error);
    throw error;
  }
};
