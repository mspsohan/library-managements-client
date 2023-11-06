import { useState } from "react";
import Swal from "sweetalert2";

const SingleBookCard = () => {
   const [borrowrdDate, setBorrowedDate] = useState()

   const handleBorrowBook = () => {

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setBorrowedDate(formattedDate)

      Swal.fire({
         title: "Are you sure?",
         text: "Please Select a Return Date!",
         input: 'date',
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Borrowed"
      }).then((result) => {
         const returnDate = result.value;
         const borrowedBookInfo = { borrowrdDate, returnDate }
         console.log(borrowedBookInfo)

         if (result.isConfirmed) {
            Swal.fire({
               title: "Success!",
               text: "The book is successfully borrowrd",
               icon: "success"
            });
         }
      });
   }
   return (
      <div>
         <div>
            <section className="text-gray-600 body-font overflow-hidden">
               <div className="container px-5 py-24 mx-auto ">
                  <div className="lg:w-4/5 mx-auto flex flex-wrap">
                     <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 dark:bg-white p-2">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">Book Name</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Animated Night Hill Illustrations</h1>

                        <div className="flex border-t border-gray-200 py-2">
                           <span className="text-gray-500">Author Name</span>
                           <span className="ml-auto text-gray-900">Blue</span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                           <span className="text-gray-500">Category</span>
                           <span className="ml-auto text-gray-900">Medium</span>
                        </div>
                        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                           <span className="text-gray-500">Quantity</span>
                           <span className="ml-auto text-gray-900">4</span>
                        </div>
                        <div className="flex mb-4">
                           <a className="flex-grow text-yellow-500 border-b-2 border-yellow-500 py-2 text-lg px-1">Description</a>
                        </div>
                        <p className="leading-relaxed mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p>
                        <div className="flex">
                           <span className="title-font font-medium text-2xl text-gray-900"></span>
                           <button onClick={handleBorrowBook} className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Borrow</button>
                           <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Read</button>
                           {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                 <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                              </svg>
                           </button> */}
                        </div>
                     </div>
                     <img alt="book" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
};

export default SingleBookCard;