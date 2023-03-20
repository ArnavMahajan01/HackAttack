const User = require("../models/User");

exports.pageOne = async (req, res) => {
  const { type, interactionTime, interaction, data, interests } = req.body;
  try {
    if (type == "volunteer" || type == "beneficiary") {
      if (data.dateofcreation != null || data.orgtype != null) {
        return res.status(405).json({
          msg: "Can't add date of creation type or organization as a field",
        });
      }

      if (!data.gender || !data.dob || !data.profileurl) {
        return res.status(405).json({ msg: "Please add all the fields" });
      }

      const user = await User.findOneAndUpdate(
        { email: req.user.email },
        {
          type: type,
          interactiontime: interactionTime,
          interaction: interaction,
          data: data,
          interests: interests,
        },
        { new: true }
      );

      return res.status(201).json({ msg: "Profile Updated  " + user });
    } else if (type == "organization") {
      if (data.dob != null || data.gender != null) {
        return res
          .status(405)
          .json({ msg: "Can't add date of birth or gender as a field" });
      }

      if (
        !data.dateofcreation ||
        !data.orgtype ||
        !data.profileurl ||
        !data.typeOfWork
      ) {
        return res.status(405).json({ msg: "Please add all the fields" });
      }

      const user = await User.findOneAndUpdate(
        { email: req.user.email },
        {
          type: type,
          interactiontime: interactionTime,
          interaction: interaction,
          data: data,
          interests: interests,
        },
        { new: true }
      );

      return res.status(201).json({ msg: "Profile Updated  " + user });
    }

    /*
        !!!Another Method To Update the values

    const user = await User.findOne({email: req.user.email})
    user.type = type;
    user
      .save()
      .then((user) => {
        res.status(200).json({ msg: "Register Successful" });
      })
      .catch((err) => console.log(err)); */

    res.status(201).json({ msg: user + " updated" });
  } catch (err) {
    res.status(404).json({ msg: "No input given" + req.user });
  }
};
