const { default: axios } = require("axios");

module.exports = async function (req, res) {
  await axios
    .post(process.env.NEXT_PUBLIC_GET_LINK, req.body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      res.status(response.status).send(response.data);
    })
    .catch(
      (err) =>
        console.log(
          "err",
          err
        ) /* res.status(err.response.status).send(err.response.data) */
    );
};
