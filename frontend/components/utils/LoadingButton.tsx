"use client";

import React from "react";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // ✅ import this

interface LoadingButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
	(
		{ isLoading = false, children, variant, size, disabled, className, ...props },
		ref,
	) => {
		return (
			<Button
				ref={ref}
				variant={variant}
				size={size}
				className={cn(className)}
				disabled={isLoading || disabled}
				{...props}>
				{isLoading && <Loader2 className='animate-spin size-6 mr-2' />}
				{children}
			</Button>
		);
	},
);

LoadingButton.displayName = "LoadingButton";
