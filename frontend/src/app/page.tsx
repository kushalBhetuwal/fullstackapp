"use client"
import React, { useEffect, useState } from 'react'
import CardComponent from './card'
import './global.css'
interface User{
    id:number,
    name:string,
    email:string
}

const Home = () => {
    const apiurl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    const [users, setUsers] = useState<User[]>([]);
    const [newUser,setNewUser] = useState({name:'', email:''});
    const [updateUser,setUpdateUser] = useState({id:'', name:'', email:''});

    // fetch the users
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch(`${apiurl}/users`);
                const data =  await response.json();
                setUsers(data);
            }
            catch(error){
                console.log('error fetching the users data', error);
            }
        }
        fetchData();
    }, []);
    const createUser= async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      
    }
    const deleteUser = async(id:number)=>{
        try{
          const response = await fetch(`${apiurl}/users/${id}`, {
            method: 'DELETE',
          })

         if(!response.ok){
          throw new Error('response not okay')
         }
         const data  = await response.json()
         console.log(data);
         setUsers(users.filter(user=>user.id!==id))
        }
        catch(error){
          console.log(error);
        }
    }
  return (
    <div className="flex justify-center items-center flex-col">
        <h1 className="text-[3rem]">User Management</h1>
        <form className="w-[25%] h-full bg-sky-400 flex flex-col items-center justify-center p-4 mt-4 rounded-lg" onSubmit={createUser}>
        <input type="text" placeholder="Name" value={newUser.name} className="p-3 w-full rounded-[12px] focus:outline-none" onChange={(e)=>setNewUser({...newUser, name:e.target.value})} />
        <input type="text" placeholder="Email" value={newUser.email} className="p-3 w-full mt-4 rounded-[12px] focus:outline-none" onChange={(e)=>setNewUser({...newUser, email:e.target.value})}/>
        <button type="submit" className="bg-sky-700 hover:text-black text-white w-full p-2 h-[40%] mt-8 border-none rounded-[12px] hover:bg-yellow-300">Add User</button>
      </form>
        {
            users.map((user)=>{
                return (
                    <div key={user.id} className='my-2 flex justify-between w-[400px] bg-green-300 p-2 rounded-lg'>
                    <CardComponent  card={user}/>
                    <button className="bg-green-400 p-2 h-[40%] mt-8 border-none rounded-[12px] hoverbutton" onClick={()=>{deleteUser(user.id)}}>Delete User</button>
                    </div>
                   
                )
            })
        }
    </div>
  )
}

export default Home