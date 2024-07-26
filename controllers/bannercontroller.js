const bannerTable = require("../models/banner");
const fs = require("fs");

exports.bannerpage = async (req, res) => {
  const username = req.session.name;
  const message = req.params.message;
  const bannerdata = await bannerTable.find();
  const allrecords = await bannerTable.find().count();
  const published = await bannerTable.find({ status: "published" }).count();
  const unpublished = await bannerTable.find({ status: "unpublished" }).count();

  res.render("admin/banner.ejs", {
    username,
    bannerdata,
    allrecords,
    published,
    unpublished,
    message,
  });
};

exports.banneraddform = (req, res) => {
  let message = "";
  const username = req.session.name;
  res.render("admin/bannerform.ejs", { username, message });
};

exports.bannerdata = (req, res) => {
  const username = req.session.name;
  let message = "";

  try {
    const { title, desc, moreDetail } = req.body;
    if (!title) {
      throw new Error("Title could not be blank!!!");
    } else if (!desc) {
      throw new Error("Description could not be blank!!!");
    } else if (!moreDetail) {
      throw new Error("More details could not be blank!!!");
    } else if (desc.length < 100) {
      throw new Error("Description could not  100 characters!!!");
    } else if (!req.file) {
      throw new Error("img could not be blank !!!!");
    }
    const filename = req.file.filename;
    const bannerData = new bannerTable({
      title: title,
      desc: desc,
      moreDetails: moreDetail,
      img: filename,
    });
    bannerData.save();
    console.log(bannerData);
    message = "Banner successfully Added";
  } catch (error) {
    message = error.message;
  }
  res.render("admin/bannerform.ejs", { username, message });
};

exports.updateStatus = async (req, res) => {
  const currentStatus = req.params.status;
  const id = req.params.id;
  let updatestatus = null;
  if (currentStatus == "unpublished") {
    updatestatus = "published";
  } else {
    updatestatus = "unpublished";
  }
  await bannerTable.findByIdAndUpdate(id, { status: updatestatus });
  res.redirect("/admin/bannermangement/message");
};

exports.deleted = async (req, res) => {
  const id = req.params.id;
  const imgname = req.params.imgname;

  await bannerTable.findByIdAndDelete(id);
  fs.unlinkSync(`./public/upload/${imgname}`);
  res.redirect("/admin/bannermangement/delete has been successfully");
};



exports.bannerupdate = async (req, res) => {
  const bannerid = req.params.bannerId;
  const data = await bannerTable.findById(bannerid);
  res.render("admin/updatebanner.ejs", { data });
};

exports.bannerupdatepost = async (req, res) => {
  const bannerid = req.params.bannerId;
  const { title, desc, moreDescriptions } = req.body;
  if (req.file) {
    const filename = req.file.filename;
    await bannerTable.findByIdAndUpdate(bannerid, {
      title: title,
      desc: desc,
      moreDetails: moreDescriptions,
      img: filename,
    });
  } else {
    await bannerTable.findByIdAndUpdate(bannerid, {
      title: title,
      desc: desc,
      moreDetails: moreDescriptions,
    });
  }
  res.redirect("/admin/bannermangement/message");
};
