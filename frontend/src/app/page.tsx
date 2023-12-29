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
    const[value, setValue] = useState("");

    // fetch the users
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch(`${apiurl}/users`);
                const data =  await response.json();
                console.log(data);
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
      const response = await fetch(`${apiurl}/users`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newUser)
      })
      const data = await response.json();
      setUsers(users=>[...users, data])
      setNewUser({name:'', email:""})
      
      
    }
    const deleteUser = async(id:number)=>{
        try{
          const response = await fetch(`${apiurl}/users/${id}`, {
            method: 'DELETE',
          })

         if(!response.ok){
          throw new Error('response not okay')
         }
         setUsers(users.filter(user=>user.id!==id))
        }
        catch(error){
          console.log(error);
        }
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
     const form = e.target as HTMLFormElement
     const formdata = new FormData(form);
     const obj ={
        id:formdata.get('id') ?? "",
        name:formdata.get('name') ?? "",
        email:formdata.get('email') ?? ""
     };

     try{
      const response = await fetch(`${apiurl}/users/${obj.id}`, {
        method:'PUT',
        headers: {'Content-type': 'application/json'},
        body:JSON.stringify(obj)
       })
       if(!response.ok){
        throw new Error("not okay response")
       }
       const data = await response.json();
       setUsers(users=>[data]);
       form.reset();
    
     }
     catch(error){
      console.log(error);
     }
    }
    const handleSearch = async (id: number) => {
      try {
          const response = await fetch(`${apiurl}/users/${id}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
          });
          if (!response.ok) {
              throw new Error("not okay response");
          }
          const data = await response.json();
          setUsers([data]); // Wrap data in an array
          setValue('');
      } catch (error) {
          console.log(error);
      }
  };
  
  const onChangeHandler = (e:any)=>{
      setValue(e.target.value)
  }
  return (
    <div className="flex justify-center items-center flex-col">
        <h1 className="text-[3rem]">User Management</h1>
        <div className="w-[25%] h-full bg-sky-400 flex flex-col items-center justify-center p-6 mt-4 rounded-lg">
          <h1 className="text-[1.7rem] capitalize text-yellow-900 text-center">Search using Id</h1>
        <input type="text" value={value} placeholder="Search using id" className="p-3 mt-4 w-full rounded-[12px] focus:outline-none" onChange={onChangeHandler}/>
        <button type="submit" className="bg-sky-700 hover:text-black text-white w-full p-2 h-[40%] mt-8 border-none rounded-[12px] hover:bg-yellow-300" onClick ={()=>handleSearch(Number(value))}>Search User</button>
      </div>
        <form className="w-[25%] h-full bg-sky-400 flex flex-col items-center justify-center p-4 mt-4 rounded-lg" onSubmit={createUser}>
        <input type="text" placeholder="Name" value={newUser.name} className="p-3 w-full rounded-[12px] focus:outline-none" onChange={(e)=>setNewUser({...newUser, name:e.target.value})} />
        <input type="text" placeholder="Email" value={newUser.email} className="p-3 w-full mt-4 rounded-[12px] focus:outline-none" onChange={(e)=>setNewUser({...newUser, email:e.target.value})}/>
        <button type="submit" className="bg-sky-700 hover:text-black text-white w-full p-2 h-[40%] mt-8 border-none rounded-[12px] hover:bg-yellow-300">Add User</button>
      </form>
      <form className="w-[25%] h-full bg-sky-400 flex flex-col items-center justify-center p-6 mt-4 rounded-lg" onSubmit={handleSubmit}>
       <input type="text" className="p-3 w-full rounded-[12px] focus:outline-none" placeholder="ID" name="id" onChange={(e)=>setUpdateUser({...updateUser, id:e.target.value})}/>
       <input type="text" className="p-3 w-full rounded-[12px] focus:outline-none mt-4" placeholder="Name" name="name" onChange={(e)=>setUpdateUser({...updateUser, name:e.target.value})}/>
       <input type="text" className="p-3 w-full mt-4 rounded-[12px] focus:outline-none" placeholder="Email" name="email" onChange={(e)=>setUpdateUser({...updateUser, email:e.target.value})}/>
       <button type="submit" className="bg-green-600 hover:text-black text-white w-full p-2 h-[40%] mt-8 border-none rounded-[12px] hover:bg-yellow-300">Update User</button>
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