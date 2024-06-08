import SignUp from "../Views/Auth/SignUp.Auth"
import Signin from "../Views/Auth/SignIn.Auth"

import Home from "../Views/Home/Home"

import Recharge from "../Views/Recharge/Recharge"

import Network from "../Views/Network/Network"

import AddWallet from "../Views/Witdarwal/AddWallet"
import Witdarwal from "../Views/Witdarwal/Witdarwal"

import Aboutus from "../Views/Aboutus"

import Help from "../Views/Help"

import Account from "../Views/Profile"

import Invite from "../Views/Invite/Invite"

import Team from "../Views/Team/team"
import ForgetPassword from "../Views/Auth/ForgetPassword"

const routes =[
    
    {path:'/signup', element:<SignUp />, exact:'true', type:'public' },
    {path:'/', element:<Signin />, exact:'true', type:'public' },

    {path:'/Home', element:<Home />, exact:'true', type:'public' },

    {path:'/recharge', element:<Recharge />, exact:'true', type:'public' },

    {path:'/network', element:<Network />, exact:'true', type:'public' },

    {path:'/addwallet', element:<AddWallet />, exact:'true', type:'public' },
    {path:'/withdrawal', element:<Witdarwal />, exact:'true', type:'public' },

    {path:'/aboutus', element:<Aboutus />, exact:'true', type:'public' },

    {path:'/help', element:<Help />, exact:'true', type:'public' },

    {path:'/profile', element:<Account />, exact:'true', type:'public' },

    {path:'/invite', element:<Invite />, exact:'true', type:'public' },

    {path:'/team', element:<Team />, exact:'true', type:'public' },
    {path:'/forgetPassword', element:<ForgetPassword/>, exact:'true', type:'public' },


]
export default routes