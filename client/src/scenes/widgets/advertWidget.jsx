import { Typography ,useTheme } from "@mui/material";
import WidgetWrapper from "components/widgetWrapper";
import FlexBetween from "components/FlexBetween";

const AdvertWidget = () => {
   const {palette} = useTheme();
   const dark = palette.neutral.dark;
   const main = palette.neutral.main;
   const medium = palette.neutral.medium;

   return(
    <WidgetWrapper>
        <FlexBetween>
            <Typography
            color={dark}
            variant="h5"
            fontWeight="500"
            >Sponsored</Typography>
            <Typography color={medium}>Created Ad</Typography>
        </FlexBetween>
        <img 
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{borderRadius:"0.75rem ", margin:"0.75rem 0"}}
        />
        <FlexBetween>
            <Typography color={main}>MikaCosemetics</Typography>
            <Typography color={medium}>mikaCosemetics.com</Typography>
        </FlexBetween>
        <Typography color={medium} m="0.5rem 0">
            Your pathway stunning and immaculate beauty nd make sure you skin is exfoliating and shining like light
        </Typography>
    </WidgetWrapper>
   )
}
export default AdvertWidget