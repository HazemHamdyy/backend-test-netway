
const restrictedTo = (types)  => (req, res, next) => {
  try{
    const userRole = req.currentUser?.role
      if(!userRole || !types.includes(userRole)) {
         res.status(403).json({
          message: `You aren't allowed to use this endpoint`,
        });
        return
      }
      next()
  }catch(err) {
    res.status(400).json(
      {
        errors: err.errors
      }
    )
  }
}

export default restrictedTo