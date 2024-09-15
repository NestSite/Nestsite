"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState, AppDispatch } from "@/store";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/store/slices/productSlice";
import { fetchStorefronts } from "@/store/slices/storefrontSlice";
import { fetchCategories } from "@/store/slices/categorySlice"; // Assuming you have a category slice
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { storefronts, loading: storefrontLoading } = useSelector(
    (state: RootState) => state.storefront
  );
  const { categories, loading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );
  const { products, loading: productLoading, error } = useSelector(
    (state: RootState) => state.product
  );

  const [selectedStorefront, setSelectedStorefront] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // To hold selected category
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // To hold selected product for editing
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // To toggle between create and edit mode
  const [isDialogOpen, setIsDialogOpen] = useState(false); // To control the product create/edit dialog
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // To control the confirm delete dialog
  const [productToDelete, setProductToDelete] = useState<string | null>(null); // To track the product to be deleted

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">("default");

  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      productImageUrl: "",
      price: "",
      description: "",
      categoryId: "", // Add categoryId here
    },
  });

  useEffect(() => {
    dispatch(fetchStorefronts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedStorefront) {
      dispatch(fetchProducts(selectedStorefront));
      dispatch(fetchCategories(selectedStorefront)); // Fetch categories when a storefront is selected
    }
  }, [dispatch, selectedStorefront]);

  const onCreateProduct = async (data: any) => {
    if (!selectedStorefront) return;
    try {
      const resultAction = await dispatch(
        createProduct({ storefrontId: selectedStorefront, newProduct: data })
      );
      if (createProduct.fulfilled.match(resultAction)) {
        setToastMessage("Product created successfully!");
        setToastVariant("default");
        setToastOpen(true);
        reset();
        setIsDialogOpen(false); // Close dialog after creating
      } else {
        const errorMessage = resultAction.payload?.message || "Failed to create product.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setToastMessage(error.message || "An unknown error occurred while creating the product.");
      setToastVariant("destructive");
      setToastOpen(true);
    }
  };

  const onUpdateProduct = async (data: any) => {
    if (!selectedStorefront) {
      setToastMessage("No storefront selected.");
      setToastVariant("destructive");
      setToastOpen(true);
      return;
    }

    if (!selectedProduct || !selectedProduct.id) {
      setToastMessage("No product selected for update.");
      setToastVariant("destructive");
      setToastOpen(true);
      return;
    }

    try {
      const resultAction = await dispatch(
        updateProduct({
          storefrontId: selectedStorefront,
          productId: selectedProduct.id, // Safely access the product ID
          updatedProduct: data,
        })
      );

      if (updateProduct.fulfilled.match(resultAction)) {
        setToastMessage("Product updated successfully!");
        setToastVariant("default");
        setToastOpen(true);
        reset();
        setIsEditMode(false);
        setIsDialogOpen(false); // Close dialog after update

        // Fetch products for the selected storefront again after the update
        await dispatch(fetchProducts(selectedStorefront));
      } else {
        const errorMessage = resultAction.payload?.message || "Failed to update product.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setToastMessage(error.message || "An error occurred while updating the product.");
      setToastVariant("destructive");
      setToastOpen(true);
    }
  };

  const onDeleteProduct = async () => {
    if (!selectedStorefront || !productToDelete) return;
    try {
      const resultAction = await dispatch(
        deleteProduct({
          storefrontId: selectedStorefront,
          productId: productToDelete,
        })
      );

      if (deleteProduct.fulfilled.match(resultAction)) {
        setToastMessage("Product deleted successfully!");
        setToastVariant("default");
        setToastOpen(true);
        setIsConfirmDialogOpen(false);
        setProductToDelete(null); // Clear the selected product for deletion
      } else {
        const errorMessage = resultAction.payload?.message || "Failed to delete product.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setToastMessage(error.message || "An error occurred while deleting the product.");
      setToastVariant("destructive");
      setToastOpen(true);
    }
  };

  const onSelectStorefront = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const storefrontId = e.target.value;
    setSelectedStorefront(storefrontId);
  };

  const onSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setValue("categoryId", e.target.value); // Set category ID in the form
  };

  const onEditProduct = (product: any) => {
    setValue("name", product.name);
    setValue("productImageUrl", product.productImageUrl);
    setValue("price", product.price);
    setValue("description", product.description);
    setValue("categoryId", product.categoryId); // Pre-select category

    setSelectedProduct(product);
    setIsEditMode(true);
    setIsDialogOpen(true); // Open the dialog when editing
  };

  const onDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setIsConfirmDialogOpen(true);
  };

  return (
    <ToastProvider swipeDirection="right">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Products</h1>

        {/* Select Storefront */}
        {storefrontLoading ? (
          <p>Loading storefronts...</p>
        ) : storefronts.length > 0 ? (
          <div className="mb-4">
            <Label htmlFor="storefrontSelect">Select Storefront</Label>
            <select
              id="storefrontSelect"
              className="border p-2 rounded-md w-full"
              onChange={onSelectStorefront}
              value={selectedStorefront || ""}
            >
              <option value="">Select a storefront</option>
              {storefronts.map((storefront) => (
                <option key={storefront.id} value={storefront.id}>
                  {storefront.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>You have no storefronts. Please create one first.</p>
        )}

        {/* Select Category */}
        {/* {categoryLoading ? (
          <p>Loading categories...</p>
        ) : categories.length > 0 ? (
          <div className="mb-4">
            <Label htmlFor="categorySelect">Select Category</Label>
            <select
              id="categorySelect"
              className="border p-2 rounded-md w-full"
              onChange={onSelectCategory}
              value={selectedCategory || ""}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>No categories found for this storefront.</p>
        )} */}

        {/* Product Table */}
        {productLoading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      <span className="font-medium">{product.name}</span>
                    </td>
                    <td className="py-3 px-6 text-left">${product.price}</td>
                    <td className="py-3 px-6 text-left">
                      {
                        categories.find(
                          (category) => category.id === product.categoryId
                        )?.name || "Uncategorized"
                      }
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center">
                        <Button
                          variant="outline"
                          className="mr-2 text-xs py-1 px-3"
                          onClick={() => onEditProduct(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          className="text-xs py-1 px-3"
                          onClick={() => onDeleteClick(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No products found for this storefront.
          </p>
        )}

        {/* Create / Edit Product Dialog */}
        {selectedStorefront && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setIsEditMode(false); // Reset to create mode
                  setIsDialogOpen(true); // Open dialog for new product creation
                  reset(); // Clear form
                }}
              >
                Create New Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Product" : "Create New Product"}
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(
                  isEditMode ? onUpdateProduct : onCreateProduct
                )}
                className="grid gap-4"
              >
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="productImageUrl">Product Image URL</Label>
                  <Input
                    id="productImageUrl"
                    placeholder="Enter product image URL"
                    {...register("productImageUrl")}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    placeholder="Enter price"
                    {...register("price", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter product description"
                    {...register("description")}
                  />
                </div>
                <div>
                  <Label htmlFor="categoryId">Category</Label>
                  <select
                    id="categoryId"
                    className="border p-2 rounded-md w-full"
                    {...register("categoryId", { required: true })}
                    value={selectedCategory || ""}
                    onChange={onSelectCategory}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {isEditMode ? "Update Product" : "Create Product"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Confirm Delete Dialog */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this product?</p>
            <DialogFooter>
              <Button variant="destructive" onClick={onDeleteProduct}>
                Yes, Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsConfirmDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Toast Notifications */}
        <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
          <ToastTitle>{toastMessage}</ToastTitle>
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default ProductPage;
