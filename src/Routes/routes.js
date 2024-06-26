import SignUp from "../Views/Auth/SignUp.Auth"
import Signin from "../Views/Auth/SignIn.Auth"

import Home from "../Views/Home/Home"

import Recharge from "../Views/Recharge/Recharge"

import Network from "../Views/Network/Network"

import AddWallet from "../Views/Witdarwal/AddWallet"
import Witdarwal from "../Views/Witdarwal/Witdarwal"

import Aboutus from "../Views/Aboutus"

import Help from "../Views/Help"

import Invite from "../Views/Invite/Invite"

import Team from "../Views/Team/team"
import ForgetPassword from "../Views/Auth/ForgetPassword"
import Profile from "../Views/Profile/Profile"
import Quantify from "../Views/Quantify/Quantify"

const routes =[
    
    {path:'/signup', element:<SignUp />, exact:'true', type:'public' },
    {path:'/', element:<Signin />, exact:'true', type:'public' },

    {path:'/Home', element:<Home />, exact:'true', type:'public' },

    {path:'/recharge', element:<Recharge />, exact:'true', type:'public' },

    {path:'/network', element:<Network />, exact:'true', type:'public' },

    {path:'/addwallet', element:<AddWallet />, exact:'true', type:'public' },
    {path:'/withdrawal', element:<Witdarwal />, exact:'true', type:'public' },

    {path:'/aboutUs', element:<Aboutus />, exact:'true', type:'public' },

    {path:'/help', element:<Help />, exact:'true', type:'public' },

    {path:'/profile', element:<Profile/>, exact:'true', type:'public' },
    {path:'/quantify', element:<Quantify/>, exact:'true', type:'public' },

    {path:'/invite', element:<Invite />, exact:'true', type:'public' },

    {path:'/team', element:<Team />, exact:'true', type:'public' },
    {path:'/forgetPassword', element:<ForgetPassword/>, exact:'true', type:'public' },


]
export default routes