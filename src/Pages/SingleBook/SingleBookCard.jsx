// import { useState } from "react";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import Retings from "../../Component/Ratings/Retings";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import LoaderSpinner from "../../Component/LoaderSpinner/LoaderSpinner";
import useAxios from "../../hooks/useAxios";

const SingleBookCard = ({ singleBook, refetch, isLoading }) => {

   const { user } = useAuth()
   const userEmail = user.email;
   const userName = user.displayName;
   const axios = useAxios()

   const { _id: id, BookName, AuthorName, BookImage, Category, Quantity, Ratings, ShortDescription, LongDescription } = singleBook;
   // const [borrowrdDate, setBorrowedDate] = useState()

   const handleBorrowBook = () => {
      Swal.fire({
         title: "Are you sure?",
         text: "Please Select a Return Date!",
         input: 'date',
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Submit"
      }).then((result) => {
         if (result.value) {
            const returnDate = result.value;
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const borrowedBookInfo = {
               id,
               BookName,
               AuthorName,
               BookImage,
               Category,
               ShortDescription,
               borrowrdDate: formattedDate,
               returnDate,
               userName,
               userEmail
            };
            if (result.isConfirmed) {

               axios.post('/borrowBook', borrowedBookInfo)
                  .then(response => {
                     if (response.data.insertedId) {
                        refetch()
                        Swal.fire({
                           title: "Great!",
                           text: "You Borrowed Book Successfully!",
                           icon: "success"
                        });
                     } else if (response.data.message) {
                        Swal.fire({
                           title: "Sorry!",
                           text: "You Already Borrowed This Book.",
                           icon: "error"
                        });
                     }
                  })
                  .catch(error => {
                     toast.error(error)
                  })
            }
         }
      });
   };

   if (isLoading) {
      return <LoaderSpinner></LoaderSpinner>
   }

   return (
      <div>
         <div>
            <section className="text-gray-600 body-font overflow-hidden">
               <div className="container px-5 py-24 mx-auto ">
                  <div className="lg:w-4/5 mx-auto flex flex-wrap">
                     <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 dark:bg-white p-2">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">Book Name</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{BookName}</h1>

                        <div className="flex border-t border-gray-200 py-2">
                           <span className="text-gray-500">Author Name</span>
                           <span className="ml-auto text-gray-900">{AuthorName}</span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                           <span className="text-gray-500">Category</span>
                           <span className="ml-auto text-gray-900">{Category}</span>
                        </div>
                        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                           <span className="text-gray-500">Quantity</span>
                           <span className="ml-auto text-gray-900">{Quantity}</span>
                        </div>
                        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                           <span className="text-gray-500">Ratings</span>
                           <span className="ml-auto text-gray-900">
                              <Retings rating={Ratings}></Retings>
                           </span>
                        </div>
                        <div className="flex mb-4">
                           <a className="flex-grow text-yellow-500 border-b-2 border-yellow-500 py-2 text-lg px-1">Description</a>
                        </div>
                        <p className="leading-relaxed mb-4">{ShortDescription}</p>
                        <p className="leading-relaxed mb-4">{LongDescription}</p>
                        <div className="flex">
                           <span className="title-font font-medium text-2xl text-gray-900"></span>
                           {Quantity > 0 ? (
                              <button onClick={handleBorrowBook} className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Borrow</button>
                           ) : (
                              <button disabled className="flex text-white bg-gray-400 border-0 py-2 px-6 focus:outline-none rounded">Out of Stock</button>
                           )}
                           <Link to={`/readBook/${id}`} className="flex ml-auto">
                              <button className=" text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Read</button>
                           </Link>
                        </div>
                     </div>
                     <div className="h-auto lg:w-1/2 lg:mt-10 xl:mt-0 xl:p-10 mx-auto object-cover object-center rounded">
                        <img alt="book" className="w-full rounded" src={BookImage} />
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
};

SingleBookCard.propTypes = {
   singleBook: PropTypes.object,
   refetch: PropTypes.func,
   isLoading: PropTypes.bool,
}
export default SingleBookCard;