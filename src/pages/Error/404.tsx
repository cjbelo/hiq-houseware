import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../media/logo.jpeg";

export const NotFound: FC = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate("/");
  };
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography align="center" color="textPrimary" variant="h3">
            404: The page you are looking for doesn't exists
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              alt="Page not found"
              src={logo}
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
              }}
            />
          </Box>

          <Button
            component="a"
            startIcon={<ArrowBackIcon fontSize="small" />}
            sx={{ mt: 3 }}
            variant="contained"
            onClick={goback}
          >
            Go back
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
