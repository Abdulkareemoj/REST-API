import { Request, Response } from "express";
import { get } from "lodash";
import {
  createProduct,
  findProduct,
  findAndUpdateProduct,
  deleteProduct,
} from "../service/product.service";
import {
  createProductInput,
  deleteProductInput,
  readProductInput,
  updateProductInput,
} from "../schema/product.schema";

export async function createProductHandler(
  req: Request<{}, {}, createProductInput["body"]>,
  res: Response
) {
  const userId =res.locals.user._id;
  const body = req.body
   const product = await createProduct({ ...body, user: userId });
  return res.send(product);
}


export async function updateProductHandler(
  req: Request<updateProductInput["params"]>,
  res: Response
) {
  const userId =res.locals.user._id;
  const productId = req.params.productId;
  const update = req.body;
  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (product.user !== userId) {
    return res.sendStatus(403);
  }
  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });
  return res.send(updatedProduct);
}


export async function getProductHandler(
  req: Request<readProductInput["params"]>,
  res: Response
) {

  const userId =res.locals.user._id
  const productId = req.params.user_id;
  
  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }
  return res.send(product);
}


export async function deleteProductHandler(
  req: Request<deleteProductInput["params"]>,
  res: Response
) {
  const userId = req.locals.user._id;
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }
  await deleteProduct({ productId });
  return res.sendStatus(200);
}
