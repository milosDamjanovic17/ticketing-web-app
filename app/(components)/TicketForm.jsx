"use client";

import { useRouter } from "next/navigation";
import React, {useState} from "react";


function TicketForm() {

   const router = useRouter()

   const handleChange = (e) => {
      const value = e.target.value;
      const name = e.target.name;

      setFormData((prevState) => ({
         ...prevState,
         [name]: value,
      }))
   };

   const handleSubmit = async (e) => {
      
      e.preventDefault();
      
      const res = await fetch("/api/Tickets", {
         method: "POST",
         body: JSON.stringify({formData}),
         "Content-Type": "application/json"
      })
      if(!res.ok){
         throw new Error("Failed to create a ticket");
      }

      router.refresh();
      router.push("/");
   }

   const startingTicketData = {
      title: "",
      description: "",
      priority: 1,
      progress: 0,
      status: "not started",
      category: "Power SW N/A",
   };

   const [formData, setFormData] = useState(startingTicketData)


  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" method="post" onSubmit={handleSubmit}>
         <h3>Create Your Ticket</h3>
         <label>Title</label>
         <input
            id="title" 
            name="title" 
            type="text" 
            onChange={handleChange} 
            required={true} 
            value={formData.title}
         />
         <label>Description</label>
         <textarea
            id="description" 
            name="description" 
            onChange={handleChange} 
            required={true} 
            value={formData.description}
            rows= "5"
         />

         <label>Category</label>
         <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Power SW N/A">Power SW n/a</option>
            <option value="Hardware Problem">Hardware Problem</option>
            <option value="Software Problem">Software Problem</option>
            <option value="Server Error">Server Error</option>
            <option value="Client Error">Client Error</option>
         </select>
         <label>Priority</label>
         <div>
            <input id="priority-1" name="priority" type="radio" onChange={handleChange} value={1} checked={formData.priority == 1}/>
            <label className="text-green-500 px-1">Low</label>
            <input id="priority-2" name="priority" type="radio" onChange={handleChange} value={2} checked={formData.priority == 2}/>
            <label className="text-yellow-300 px-1">Medium</label>
            <input id="priority-3" name="priority" type="radio" onChange={handleChange} value={3} checked={formData.priority == 3}/>
            <label className="text-orange-400 px-1">High</label>
            <input id="priority-4" name="priority" type="radio" onChange={handleChange} value={4} checked={formData.priority == 4}/>
            <label className="text-red-400 px-1">Urgent</label>
            <input id="priority-5" name="priority" type="radio" onChange={handleChange} value={5} checked={formData.priority == 5}/>
            <label className="text-purple-500 px-1 font-semibold">Critical</label>
         </div>

         <label>Progress</label>
         <input type="range" id="progress" name="progress" value={formData.progress} min="0" max="100" onChange={handleChange} />

         <label>Status</label>
         <select name="status" value={formData.status} onChange={handleChange}>
            <option value="not started">Not Started / In Progress</option>
            <option value="started">Started</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="canceled">Canceled</option>
         </select>

         <input type="submit" className="btn" value="Create Ticket" />
      </form>
    </div>
  )
}

export default TicketForm