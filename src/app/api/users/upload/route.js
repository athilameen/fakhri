import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import mysqlDb from "@/lib/mysqldb";
const crypto = require("crypto");

export async function POST(request) {

  const id_user = 545;

  const data = await request.formData();
  const file  = data.get("upload_pic");

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes);

  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  if (!file.type.match(imageMimeType)) {
    return NextResponse.json(
      { message: file.type + " format couldn't allow, upload jpg, jpeg, png, gif format only" },
      { status: 405 }
    );
  }

  if (file.size > 2 * 1000 * 1024) {
      return NextResponse.json(
        { message: "File with maximum size of 2MB is allowed" },
        { status: 405 }
      );
  }

  let genNewFileName = crypto.randomBytes(20).toString('hex');
  const fileExtantation = file.type.replace('image/', '');
  const updateFile = new File([file], genNewFileName+'.'+fileExtantation, {type: file.type});

  const path = `public/user_img/${updateFile.name}`
  await writeFile(path, buffer)

  try {
    const pictureUpdate = await mysqlDb.query(
      `UPDATE fpa_user SET image="${updateFile.name}" WHERE id_user=${id_user}`
    );
    
    if (pictureUpdate) {
      return NextResponse.json(
        { message: "Profile picture updated successfully", image: updateFile.name },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Profile picture couldn't update", data: [] },
        { status: 204 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something wrong while update the profile picture!" },
      { status: 500 }
    );
  }

}

export async function DELETE(request) {

  const id_user = 545;

  try {

    const [pictureRemove] = await mysqlDb.query(
      `UPDATE fpa_user SET image="" WHERE id_user=${id_user}`
    );

    if (pictureRemove) {
      return NextResponse.json(
        { message: "Profile picture deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Profile picture couldn't delete", data: [] },
        { status: 204 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something wrong while delete the profile picture!" },
      { status: 500 }
    );
  }

}