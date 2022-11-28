
import { MdFlightLand} from "react-icons/md"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState, } from "react"

export default function Register(){

    const[passwordEye,setPasswordEye]=useState(false)
    const[confirmPasswordEye,setConfirmPasswordEye]=useState(false)

    const handleToogle=()=>{
        setPasswordEye(!passwordEye)
        
    }
    const handleConfirmToogle=()=>{
        setConfirmPasswordEye(!confirmPasswordEye)
        
    }

    return(
        <>

            <section className="bg-gray-400 min-h-screen flex items-center justify-center">
                <div className="bg-white flex rounded-2xl shadow-lg  px-0 ">
                    <div className=" sm:w-9/12   p-28 rounded-2xl">
                        <h1 className="font-bold text-2xl">Register</h1>
                        <p className="text-sm mt-5  ">Get Started! Please enter your details</p>

                        <form action="" className="flex flex-col w-80" >
                            <div className=" mt-5 ">Full Name</div>
                            <input type="text" className=" focus:outline-0 border-1  border-gray px-9 rounded-md pl-5 placeholder:text-sm" placeholder="Enter your Full Name" />
                            <div className=" mt-5 ">Email</div>
                            <input type="email" className=" focus:outline-0 border-1  border-gray px-9 rounded-md pl-5 placeholder:text-sm" placeholder="Enter your Email" />

                            <div className=" mt-5 ">Password</div>
                            <div className="flex">
                                <input  className="  w-full focus:outline-0 border-1 px-9 border-gray  pl-5 rounded-md placeholder:text-sm" type={(passwordEye===false)? 'password':'text'} placeholder="Enter your Password"/> 
                                <span  className="absolute ml-72 my-3" >
                                    {
                                        (passwordEye=== false)?<FaEyeSlash onClick={handleToogle}/>:<FaEye onClick={handleToogle}/>
                                    }
                                </span>
                            </div>

                            <div className=" mt-5 ">Password Confirmation</div>
                            <div className="flex">
                                <input className=" w-full focus:outline-0 border-1 px-9 border-gray  pl-5 rounded-md placeholder:text-sm "  type={(confirmPasswordEye===false)? 'password':'text'} placeholder="Enter your Password Confirmation"/> 
                                <span  className="absolute ml-72 my-3" >
                                    {
                                        (confirmPasswordEye=== false)?<FaEyeSlash onClick={handleConfirmToogle}/>:<FaEye onClick={handleConfirmToogle}/>
                                    }
                                </span>
                            </div>
                        
                            <button className=" text-xs ml-auto mt-2 text-[#7E56DA]"> Forgot Password </button>
                            <button className="bg-[#7E56DA] rounded-md mt-5 text-white text-sm h-7">Sign up</button>
                            <div  className=" text-sm text-center mt-5">Already Have An Account? <Link to="/Login"><button className=" text-xs ml-2 mt-2 text-[#7E56DA]" >  Sign In</button></Link></div>
                        </form>

                    </div>
                    <div  className=" sm:block hidden w-9/12 rounded-r-2xl bg-gray-100 p-28 px-28 decoration-purple-500 font-bold text-purple-500 font-sans text-center italic " > <MdFlightLand className='text-[#7E56DA]  mt-20' size={200} /> Terbang Tinggi App
                        </div> 
                </div>
            </section>

        </>
    )
}