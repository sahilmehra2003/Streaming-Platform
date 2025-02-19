// promises use karke bnaya ha
const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }

}

export {asyncHandler};





// const asyncHandler=()=>{}
// const asyncHandler=(func)=>async()=>{}

// using try-catch
// this is a higher order function that treats functions as parameter and also returns them
// const asyncHandler=(fn)=>async (req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }
// wrapper function that we are going to use in our code