import { Request, Response } from "express";
import driver from "../config";

export const getResumes = async (req: Request, res: Response) => {
  const session = driver.session();

  const result = await session.run("MATCH (n:Resume) RETURN n").catch((err) => {
    console.log(err);
  });

  return res.json({
    success: true,
    result: result?.records[0].get("n"),
  });
};
