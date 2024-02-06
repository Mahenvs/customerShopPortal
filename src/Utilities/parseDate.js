export const parseDate = (DateTime) =>{
   return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(DateTime))
    
}