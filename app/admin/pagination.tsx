// // In your UsersTable component:
// const [page, setPage] = useState(1);
// const [totalRecords, setTotalRecords] = useState(0);

// useEffect(() => {
//   const fetchUsers = async () => {
//     // ... (Error handling, setIsLoading)
//     const response = await fetch(`/api/users?page=${page}&limit=10`);
//     const data = await response.json();
//     setUsers(data.user_data);
//     setTotalRecords(data.totalRecords);
//     // ... (Error handling, setIsLoading)
//   };
//   fetchUsers();
// }, [page]); // useEffect dependency on page

// const handleNextPage = () => {
//   setPage(prevPage => prevPage + 1);
// };

// const handlePreviousPage = () => {
//   setPage(prevPage => Math.max(1, prevPage - 1)); // Prevent going below page 1
// };

// // In your return statement:
// <div>
//   <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
//   <span>Page {page}</span>
//   <button onClick={handleNextPage} disabled={users.length < 10}>Next</button> {/* Disable if fewer than limit users on current page */}
//   <p>Total users: {totalRecords}</p>
// </div>