import { Select, MenuItem } from "@mui/material";
import { LANGUAGES } from "../../config/languages";

export function LanguageSelct({ value, onChange}:any){

return(
<Select value={value} onChange={(e)=> onChange(e.target.value)}>
{
  LANGUAGES.map(l =>(
    <MenuItem key={l} value = {l}> {l}</MenuItem>

  ))
}
</Select>

)

}