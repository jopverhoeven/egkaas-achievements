import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

export interface BannerProps {
  // banner back button
  backButtonUrl: string;

  //   banner text
  text: string;

  //   banner action button
  showActionButton: boolean;
  actionButtonText?: string;
  actionButtonUrl?: string;

  //   banner delete button
  showDeleteButton: boolean;
  deleteButtonFunction?: Function;
  deleteButtonLoading?: boolean;
}

export default function Banner(props: BannerProps) {
  // @ts-ignore
  const { currentUser } = useAuth();

  return (
    <div className="w-full p-2 bg-gray-600 flex flex-col items-center sticky top-0 z-50 shadow-3xl">
      <div className="flex flex-row w-full">
        <Link
          to={props.backButtonUrl}
          className="flex items-center justify-center rounded bg-gray-500"
        >
          <ArrowLeftIcon className="h-8 w-8 p-1 text-white" />
        </Link>
        <h1 className="flex-auto text-3xl font-medium text-center">
          {props.text}
        </h1>

        {props.showDeleteButton && currentUser ? (
          <button
            className="flex items-center justify-center rounded bg-gray-500"
            // @ts-ignore
            onClick={props.deleteButtonFunction}
            disabled={props.deleteButtonLoading}
          >
            <TrashIcon className="h-8 w-8 p-1 text-white" />
          </button>
        ) : (
          <div className="h-8 w-8"></div>
        )}
      </div>
      {props.showActionButton && currentUser && (
        <Link
          // @ts-ignore
          to={props.actionButtonUrl}
          className="p-1 mt-2 rounded bg-gray-500 hover:bg-gray-400"
        >
          {props.actionButtonText}
        </Link>
      )}
    </div>
  );
}
