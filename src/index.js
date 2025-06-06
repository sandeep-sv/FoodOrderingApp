   import React, { lazy , Suspense } from "react";
   import ReactDom from "react-dom/client"
   import Header from "./components/Header";
   import Body from "./components/Body";
   import About from "./components/About";
   //import Contact from "./components/Contact";
   import RestrauntMenu from "./components/RestaurantMenu";
   import Error from "./components/Error";
   import { createBrowserRouter,RouterProvider , Outlet} from "react-router-dom";
   import { Provider  } from "react-redux";
   import appStore from "./utils/appStore";
   import Cart from "./components/Cart";
   import Footer from "./components/Footer";


   const Contact = lazy(()=> import("./components/Contact"));
   
   const AppLayout = ()=>{
      return (
         <Provider store={appStore}>
            <div className="app">
               <Header />
               <Outlet />
               
            </div>

         </Provider>
         
      )
   }

   const appRouter = createBrowserRouter([
      {
         path:"/",
         element:<AppLayout />,
         children:[
            {
               path:"/",
               element:<Body />
            },
            {
               path:"/about",
               element:<About />
            },
            {
               path:"/contact",
               element: <Suspense fallback={<h1>Loading...</h1>}><Contact /></Suspense> 
            },
            {
               path:"/restraunts/:resId",
               element:<RestrauntMenu />
            },
            {
               path:"/cart",
               element:<Cart />
            },
         ],
         errorElement:<Error />

      }, 
      
   ]);

   const root = ReactDom.createRoot(document.getElementById("root"));
   root.render(<RouterProvider router={appRouter} />);  