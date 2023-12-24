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
    }, [])
  return (
    <div className="flex justify-center items-center flex-col">
        <h1 className="text-[3rem]">User Management</h1>
        {
            users.map((user)=>{
                return (
                    <div key={user.id} className='my-2 flex justify-between w-[400px] bg-green-300 p-2 rounded-lg'>
                    <CardComponent  card={user}/>
                    <button className="bg-green-400 p-2 h-[40%] mt-8 border-none rounded-[12px] hoverbutton" onClick={()=>{}}>Delete User</button>
                    </div>
                   
                )
            })
        }
    </div>
  )
}

export default Home