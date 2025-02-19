class ApiResponse{
    constructor(statuseCode,data,message="Success"){
        this.statuseCode=statuseCode,
        this.data=data
        this.message=message
        this.success=statuseCode<400 // server has status code as it is response higher than 400 is usually error
    }
}
export {ApiResponse}