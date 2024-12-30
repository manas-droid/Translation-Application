

const url = `${import.meta.env.VITE_SERVER_URL}/user`


export interface UserModel{
    userId:string
}

export const addUser = async (user:UserModel):Promise<any> =>{
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(user),
        });
        if(!response.ok){
            console.error(response);
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Optionally, you can rethrow or handle it in your app
    }
}