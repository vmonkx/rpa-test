const { default: axios } = require("axios");

module.exports = async function (req, res) {
  await axios
    .post(process.env.NEXT_PUBLIC_GET_LINK, req.body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        res.status(200).send(response);
      } else {
        res
          .status(400)
          .send(
            "Что то пошло не так, попробуйте еще раз или позвоните нам по телефону"
          );
      }
    })
    .catch((err) => res.status(err.response.status).send(err.response.data));
};
