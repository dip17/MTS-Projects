import React, { useState } from 'react';
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { searchUserPostStart } from '../../store/actions/OtherUserAction';
import { translate, t } from "react-multi-lang";
import NoDataFound from '../NoDataFound/NoDataFound';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfiniteScroll from "react-infinite-scroll-component";

const ProfileSinglePost = ({ post }) => {

    const [postFile, setPostFile] = useState(post.postFiles[0]);

    return (
        <>
            {postFile.file_type === "image" ? (
                //Image File
                post.payment_info.is_user_needs_pay == 1 ? (
                    //Locked Image
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-lock-post-card">
                            <div className="profile-lock-img-sec">
                                {/* <Image
                                                            className="profile-lock-img"
                                                            src={postFile.post_file}
                                                        /> */}
                                <LazyLoadImage
                                    className="profile-lock-img"
                                    src={postFile.post_file}
                                    effect="blur" />
                                <div className="profile-lock-icon-sec">
                                    <Image
                                        className="profile-lock-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-home/icon/lock-icon.png"
                                        }
                                    />
                                </div>
                                <div className="ppv-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="24"
                                        height="24"
                                        enableBackground="new 0 0 512 512"
                                        viewBox="0 0 32 32"
                                    >
                                        <linearGradient
                                            id="a"
                                            x1="-0.04"
                                            x2="31.01"
                                            y1="7"
                                            y2="7"
                                            data-name="New Gradient Swatch"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stopColor="#fff"></stop>
                                            <stop offset="1" stopColor="#fff"></stop>
                                        </linearGradient>
                                        <linearGradient
                                            id="b"
                                            y1="25"
                                            y2="25"
                                            data-name="New Gradient Swatch"
                                            xlinkHref="#a"
                                        ></linearGradient>
                                        <linearGradient
                                            id="c"
                                            x2="31.01"
                                            y1="16"
                                            y2="16"
                                            data-name="New Gradient Swatch"
                                            xlinkHref="#a"
                                        ></linearGradient>
                                        <path
                                            fill="url(#a)"
                                            d="M2 10c.55 0 1-.45 1-1V7c0-.55.45-1 1-1h2c.55 0 1-.45 1-1s-.45-1-1-1H4C2.35 4 1 5.35 1 7v2c0 .55.45 1 1 1zm26-6h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1 .45 1 1v2c0 .55.45 1 1 1s1-.45 1-1V7c0-1.65-1.35-3-3-3z"
                                            data-original="url(#a)"
                                        ></path>
                                        <path
                                            fill="url(#b)"
                                            d="M6 26H4c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 1.65 1.35 3 3 3h2c.55 0 1-.45 1-1s-.45-1-1-1zm24-4c-.55 0-1 .45-1 1v2c0 .55-.45 1-1 1h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c1.65 0 3-1.35 3-3v-2c0-.55-.45-1-1-1z"
                                            data-original="url(#b)"
                                        ></path>
                                        <g fill="url(#c)">
                                            <path d="M16 7C9.83 7 4.13 10.26 1.13 15.5c-.18.31-.18.69 0 .99 3 5.25 8.7 8.5 14.87 8.5s11.87-3.26 14.87-8.5c.18-.31.18-.69 0-.99-3-5.25-8.7-8.5-14.87-8.5zM3.17 16a14.77 14.77 0 014.98-4.84C7.42 12.63 7 14.29 7 16s.41 3.37 1.15 4.84C6.15 19.65 4.43 18 3.17 16zm8.7 6.43c-1.79-1.51-2.86-3.89-2.86-6.43s1.07-4.92 2.86-6.43C13.2 9.2 14.59 9 16.01 9s2.81.2 4.14.57c1.79 1.51 2.86 3.89 2.86 6.43s-1.07 4.92-2.86 6.43c-1.33.37-2.72.57-4.14.57s-2.81-.2-4.14-.57zm11.99-1.59c.73-1.47 1.15-3.13 1.15-4.84s-.41-3.37-1.15-4.84c2 1.19 3.72 2.84 4.98 4.84a14.77 14.77 0 01-4.98 4.84z"></path>
                                            <path d="M16.83 15h-1.67a.67.67 0 010-1.34h3.33c.55 0 1-.45 1-1s-.45-1-1-1h-1.5v-.67c0-.55-.45-1-1-1s-1 .45-1 1v.68c-1.39.09-2.5 1.24-2.5 2.65s1.2 2.67 2.67 2.67h1.67a.67.67 0 010 1.34H13.5c-.55 0-1 .45-1 1s.45 1 1 1H15V21c0 .55.45 1 1 1s1-.45 1-1v-.68c1.39-.09 2.5-1.24 2.5-2.65S18.3 15 16.83 15z"></path>
                                        </g>
                                    </svg>
                                    <span>{post.amount_formatted}</span>
                                </div>
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                ) : (
                    //Free Image
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-image-post-card">
                            <div className="profile-image-img-sec">
                                {/* <Image
                                                            className="profile-image-img"
                                                            src={postFile.post_file}
                                                        /> */}
                                <LazyLoadImage
                                    className="profile-image-img"
                                    src={postFile.post_file}
                                    effect="blur" />
                                {post.amount > 0 ?
                                    <div className="ppv-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            width="24"
                                            height="24"
                                            enableBackground="new 0 0 512 512"
                                            viewBox="0 0 32 32"
                                        >
                                            <linearGradient
                                                id="a"
                                                x1="-0.04"
                                                x2="31.01"
                                                y1="7"
                                                y2="7"
                                                data-name="New Gradient Swatch"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop offset="0" stopColor="#fff"></stop>
                                                <stop offset="1" stopColor="#fff"></stop>
                                            </linearGradient>
                                            <linearGradient
                                                id="b"
                                                y1="25"
                                                y2="25"
                                                data-name="New Gradient Swatch"
                                                xlinkHref="#a"
                                            ></linearGradient>
                                            <linearGradient
                                                id="c"
                                                x2="31.01"
                                                y1="16"
                                                y2="16"
                                                data-name="New Gradient Swatch"
                                                xlinkHref="#a"
                                            ></linearGradient>
                                            <path
                                                fill="url(#a)"
                                                d="M2 10c.55 0 1-.45 1-1V7c0-.55.45-1 1-1h2c.55 0 1-.45 1-1s-.45-1-1-1H4C2.35 4 1 5.35 1 7v2c0 .55.45 1 1 1zm26-6h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1 .45 1 1v2c0 .55.45 1 1 1s1-.45 1-1V7c0-1.65-1.35-3-3-3z"
                                                data-original="url(#a)"
                                            ></path>
                                            <path
                                                fill="url(#b)"
                                                d="M6 26H4c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 1.65 1.35 3 3 3h2c.55 0 1-.45 1-1s-.45-1-1-1zm24-4c-.55 0-1 .45-1 1v2c0 .55-.45 1-1 1h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c1.65 0 3-1.35 3-3v-2c0-.55-.45-1-1-1z"
                                                data-original="url(#b)"
                                            ></path>
                                            <g fill="url(#c)">
                                                <path d="M16 7C9.83 7 4.13 10.26 1.13 15.5c-.18.31-.18.69 0 .99 3 5.25 8.7 8.5 14.87 8.5s11.87-3.26 14.87-8.5c.18-.31.18-.69 0-.99-3-5.25-8.7-8.5-14.87-8.5zM3.17 16a14.77 14.77 0 014.98-4.84C7.42 12.63 7 14.29 7 16s.41 3.37 1.15 4.84C6.15 19.65 4.43 18 3.17 16zm8.7 6.43c-1.79-1.51-2.86-3.89-2.86-6.43s1.07-4.92 2.86-6.43C13.2 9.2 14.59 9 16.01 9s2.81.2 4.14.57c1.79 1.51 2.86 3.89 2.86 6.43s-1.07 4.92-2.86 6.43c-1.33.37-2.72.57-4.14.57s-2.81-.2-4.14-.57zm11.99-1.59c.73-1.47 1.15-3.13 1.15-4.84s-.41-3.37-1.15-4.84c2 1.19 3.72 2.84 4.98 4.84a14.77 14.77 0 01-4.98 4.84z"></path>
                                                <path d="M16.83 15h-1.67a.67.67 0 010-1.34h3.33c.55 0 1-.45 1-1s-.45-1-1-1h-1.5v-.67c0-.55-.45-1-1-1s-1 .45-1 1v.68c-1.39.09-2.5 1.24-2.5 2.65s1.2 2.67 2.67 2.67h1.67a.67.67 0 010 1.34H13.5c-.55 0-1 .45-1 1s.45 1 1 1H15V21c0 .55.45 1 1 1s1-.45 1-1v-.68c1.39-.09 2.5-1.24 2.5-2.65S18.3 15 16.83 15z"></path>
                                            </g>
                                        </svg>
                                        <span>{post.amount_formatted}</span>
                                    </div>
                                : ''}
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                )
            ) : postFile.file_type === "video" ? (
                // Video Section
                post.payment_info.is_user_needs_pay == 1 ? (
                    //Locked Video
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-lock-post-card">
                            <div className="profile-lock-img-sec">
                                <LazyLoadImage
                                    className="profile-lock-img"
                                    src={postFile.preview_file
                                        ? postFile.preview_file
                                        : postFile.post_file}
                                    effect="blur"
                                />
                                <div className="profile-lock-icon-sec">
                                    <Image
                                        className="profile-lock-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-home/icon/lock-icon.png"
                                        }
                                    />
                                </div>
                                <div className="ppv-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="24"
                                        height="24"
                                        enableBackground="new 0 0 512 512"
                                        viewBox="0 0 32 32"
                                    >
                                        <linearGradient
                                            id="a"
                                            x1="-0.04"
                                            x2="31.01"
                                            y1="7"
                                            y2="7"
                                            data-name="New Gradient Swatch"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stopColor="#fff"></stop>
                                            <stop offset="1" stopColor="#fff"></stop>
                                        </linearGradient>
                                        <linearGradient
                                            id="b"
                                            y1="25"
                                            y2="25"
                                            data-name="New Gradient Swatch"
                                            xlinkHref="#a"
                                        ></linearGradient>
                                        <linearGradient
                                            id="c"
                                            x2="31.01"
                                            y1="16"
                                            y2="16"
                                            data-name="New Gradient Swatch"
                                            xlinkHref="#a"
                                        ></linearGradient>
                                        <path
                                            fill="url(#a)"
                                            d="M2 10c.55 0 1-.45 1-1V7c0-.55.45-1 1-1h2c.55 0 1-.45 1-1s-.45-1-1-1H4C2.35 4 1 5.35 1 7v2c0 .55.45 1 1 1zm26-6h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1 .45 1 1v2c0 .55.45 1 1 1s1-.45 1-1V7c0-1.65-1.35-3-3-3z"
                                            data-original="url(#a)"
                                        ></path>
                                        <path
                                            fill="url(#b)"
                                            d="M6 26H4c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 1.65 1.35 3 3 3h2c.55 0 1-.45 1-1s-.45-1-1-1zm24-4c-.55 0-1 .45-1 1v2c0 .55-.45 1-1 1h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c1.65 0 3-1.35 3-3v-2c0-.55-.45-1-1-1z"
                                            data-original="url(#b)"
                                        ></path>
                                        <g fill="url(#c)">
                                            <path d="M16 7C9.83 7 4.13 10.26 1.13 15.5c-.18.31-.18.69 0 .99 3 5.25 8.7 8.5 14.87 8.5s11.87-3.26 14.87-8.5c.18-.31.18-.69 0-.99-3-5.25-8.7-8.5-14.87-8.5zM3.17 16a14.77 14.77 0 014.98-4.84C7.42 12.63 7 14.29 7 16s.41 3.37 1.15 4.84C6.15 19.65 4.43 18 3.17 16zm8.7 6.43c-1.79-1.51-2.86-3.89-2.86-6.43s1.07-4.92 2.86-6.43C13.2 9.2 14.59 9 16.01 9s2.81.2 4.14.57c1.79 1.51 2.86 3.89 2.86 6.43s-1.07 4.92-2.86 6.43c-1.33.37-2.72.57-4.14.57s-2.81-.2-4.14-.57zm11.99-1.59c.73-1.47 1.15-3.13 1.15-4.84s-.41-3.37-1.15-4.84c2 1.19 3.72 2.84 4.98 4.84a14.77 14.77 0 01-4.98 4.84z"></path>
                                            <path d="M16.83 15h-1.67a.67.67 0 010-1.34h3.33c.55 0 1-.45 1-1s-.45-1-1-1h-1.5v-.67c0-.55-.45-1-1-1s-1 .45-1 1v.68c-1.39.09-2.5 1.24-2.5 2.65s1.2 2.67 2.67 2.67h1.67a.67.67 0 010 1.34H13.5c-.55 0-1 .45-1 1s.45 1 1 1H15V21c0 .55.45 1 1 1s1-.45 1-1v-.68c1.39-.09 2.5-1.24 2.5-2.65S18.3 15 16.83 15z"></path>
                                        </g>
                                    </svg>
                                    <span>{post.amount_formatted}</span>
                                </div>
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                ) : (
                    //Free Video
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-video-post-card">
                            <div className="profile-video-img-sec">
                                <LazyLoadImage
                                    className="profile-video-img"
                                    src={postFile.preview_file
                                        ? postFile.preview_file
                                        : postFile.post_file}
                                    effect="blur"
                                />
                                {post.amount > 0 ?
                                    <div className="ppv-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            width="24"
                                            height="24"
                                            enableBackground="new 0 0 512 512"
                                            viewBox="0 0 32 32"
                                        >
                                            <linearGradient
                                                id="a"
                                                x1="-0.04"
                                                x2="31.01"
                                                y1="7"
                                                y2="7"
                                                data-name="New Gradient Swatch"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop offset="0" stopColor="#fff"></stop>
                                                <stop offset="1" stopColor="#fff"></stop>
                                            </linearGradient>
                                            <linearGradient
                                                id="b"
                                                y1="25"
                                                y2="25"
                                                data-name="New Gradient Swatch"
                                                xlinkHref="#a"
                                            ></linearGradient>
                                            <linearGradient
                                                id="c"
                                                x2="31.01"
                                                y1="16"
                                                y2="16"
                                                data-name="New Gradient Swatch"
                                                xlinkHref="#a"
                                            ></linearGradient>
                                            <path
                                                fill="url(#a)"
                                                d="M2 10c.55 0 1-.45 1-1V7c0-.55.45-1 1-1h2c.55 0 1-.45 1-1s-.45-1-1-1H4C2.35 4 1 5.35 1 7v2c0 .55.45 1 1 1zm26-6h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1 .45 1 1v2c0 .55.45 1 1 1s1-.45 1-1V7c0-1.65-1.35-3-3-3z"
                                                data-original="url(#a)"
                                            ></path>
                                            <path
                                                fill="url(#b)"
                                                d="M6 26H4c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 1.65 1.35 3 3 3h2c.55 0 1-.45 1-1s-.45-1-1-1zm24-4c-.55 0-1 .45-1 1v2c0 .55-.45 1-1 1h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c1.65 0 3-1.35 3-3v-2c0-.55-.45-1-1-1z"
                                                data-original="url(#b)"
                                            ></path>
                                            <g fill="url(#c)">
                                                <path d="M16 7C9.83 7 4.13 10.26 1.13 15.5c-.18.31-.18.69 0 .99 3 5.25 8.7 8.5 14.87 8.5s11.87-3.26 14.87-8.5c.18-.31.18-.69 0-.99-3-5.25-8.7-8.5-14.87-8.5zM3.17 16a14.77 14.77 0 014.98-4.84C7.42 12.63 7 14.29 7 16s.41 3.37 1.15 4.84C6.15 19.65 4.43 18 3.17 16zm8.7 6.43c-1.79-1.51-2.86-3.89-2.86-6.43s1.07-4.92 2.86-6.43C13.2 9.2 14.59 9 16.01 9s2.81.2 4.14.57c1.79 1.51 2.86 3.89 2.86 6.43s-1.07 4.92-2.86 6.43c-1.33.37-2.72.57-4.14.57s-2.81-.2-4.14-.57zm11.99-1.59c.73-1.47 1.15-3.13 1.15-4.84s-.41-3.37-1.15-4.84c2 1.19 3.72 2.84 4.98 4.84a14.77 14.77 0 01-4.98 4.84z"></path>
                                                <path d="M16.83 15h-1.67a.67.67 0 010-1.34h3.33c.55 0 1-.45 1-1s-.45-1-1-1h-1.5v-.67c0-.55-.45-1-1-1s-1 .45-1 1v.68c-1.39.09-2.5 1.24-2.5 2.65s1.2 2.67 2.67 2.67h1.67a.67.67 0 010 1.34H13.5c-.55 0-1 .45-1 1s.45 1 1 1H15V21c0 .55.45 1 1 1s1-.45 1-1v-.68c1.39-.09 2.5-1.24 2.5-2.65S18.3 15 16.83 15z"></path>
                                            </g>
                                        </svg>
                                        <span>{post.amount_formatted}</span>
                                    </div>
                                : ''}
                                <div className="profile-video-icon-sec">
                                    <Image
                                        className="profile-video-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-home/icon/video-icon.png"
                                        }
                                    />
                                </div>

                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                )
            ) : postFile.file_type === "audio" ? (
                // Audio
                post.payment_info.is_user_needs_pay == 1 ? (
                    //Locked Audio
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-lock-post-card">
                            <div className="profile-lock-img-sec">
                                <LazyLoadImage
                                    className="profile-lock-img"
                                    src={postFile.preview_file
                                        ? postFile.preview_file
                                        : postFile.post_file}
                                    effect="blur"
                                />
                                <div className="profile-lock-icon-sec">
                                    <Image
                                        className="profile-lock-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-home/icon/lock-icon.png"
                                        }
                                    />
                                </div>
                                <div className="ppv-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="24"
                                        height="24"
                                        enableBackground="new 0 0 512 512"
                                        viewBox="0 0 32 32"
                                    >
                                        <linearGradient
                                            id="a"
                                            x1="-0.04"
                                            x2="31.01"
                                            y1="7"
                                            y2="7"
                                            data-name="New Gradient Swatch"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stopColor="#fff"></stop>
                                            <stop offset="1" stopColor="#fff"></stop>
                                        </linearGradient>
                                        <linearGradient
                                            id="b"
                                            y1="25"
                                            y2="25"
                                            data-name="New Gradient Swatch"
                                            xlinkHref="#a"
                                        ></linearGradient>
                                        <linearGradient
                                            id="c"
                                            x2="31.01"
                                            y1="16"
                                            y2="16"
                                            data-name="New Gradient Swatch"
                                            xlinkHref="#a"
                                        ></linearGradient>
                                        <path
                                            fill="url(#a)"
                                            d="M2 10c.55 0 1-.45 1-1V7c0-.55.45-1 1-1h2c.55 0 1-.45 1-1s-.45-1-1-1H4C2.35 4 1 5.35 1 7v2c0 .55.45 1 1 1zm26-6h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1 .45 1 1v2c0 .55.45 1 1 1s1-.45 1-1V7c0-1.65-1.35-3-3-3z"
                                            data-original="url(#a)"
                                        ></path>
                                        <path
                                            fill="url(#b)"
                                            d="M6 26H4c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 1.65 1.35 3 3 3h2c.55 0 1-.45 1-1s-.45-1-1-1zm24-4c-.55 0-1 .45-1 1v2c0 .55-.45 1-1 1h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c1.65 0 3-1.35 3-3v-2c0-.55-.45-1-1-1z"
                                            data-original="url(#b)"
                                        ></path>
                                        <g fill="url(#c)">
                                            <path d="M16 7C9.83 7 4.13 10.26 1.13 15.5c-.18.31-.18.69 0 .99 3 5.25 8.7 8.5 14.87 8.5s11.87-3.26 14.87-8.5c.18-.31.18-.69 0-.99-3-5.25-8.7-8.5-14.87-8.5zM3.17 16a14.77 14.77 0 014.98-4.84C7.42 12.63 7 14.29 7 16s.41 3.37 1.15 4.84C6.15 19.65 4.43 18 3.17 16zm8.7 6.43c-1.79-1.51-2.86-3.89-2.86-6.43s1.07-4.92 2.86-6.43C13.2 9.2 14.59 9 16.01 9s2.81.2 4.14.57c1.79 1.51 2.86 3.89 2.86 6.43s-1.07 4.92-2.86 6.43c-1.33.37-2.72.57-4.14.57s-2.81-.2-4.14-.57zm11.99-1.59c.73-1.47 1.15-3.13 1.15-4.84s-.41-3.37-1.15-4.84c2 1.19 3.72 2.84 4.98 4.84a14.77 14.77 0 01-4.98 4.84z"></path>
                                            <path d="M16.83 15h-1.67a.67.67 0 010-1.34h3.33c.55 0 1-.45 1-1s-.45-1-1-1h-1.5v-.67c0-.55-.45-1-1-1s-1 .45-1 1v.68c-1.39.09-2.5 1.24-2.5 2.65s1.2 2.67 2.67 2.67h1.67a.67.67 0 010 1.34H13.5c-.55 0-1 .45-1 1s.45 1 1 1H15V21c0 .55.45 1 1 1s1-.45 1-1v-.68c1.39-.09 2.5-1.24 2.5-2.65S18.3 15 16.83 15z"></path>
                                        </g>
                                    </svg>
                                    <span>{post.amount_formatted}</span>
                                </div>
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                ) : (
                    //Free Audio
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-audio-post-card">
                            <div className="profile-audio-img-sec">
                                <LazyLoadImage
                                    className="profile-audio-img"
                                    src={postFile.preview_file
                                        ? postFile.preview_file
                                        : postFile.post_file}
                                    effect="blur"
                                />
                                {post.amount > 0 ?
                                    <div className="ppv-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            width="24"
                                            height="24"
                                            enableBackground="new 0 0 512 512"
                                            viewBox="0 0 32 32"
                                        >
                                            <linearGradient
                                                id="a"
                                                x1="-0.04"
                                                x2="31.01"
                                                y1="7"
                                                y2="7"
                                                data-name="New Gradient Swatch"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop offset="0" stopColor="#fff"></stop>
                                                <stop offset="1" stopColor="#fff"></stop>
                                            </linearGradient>
                                            <linearGradient
                                                id="b"
                                                y1="25"
                                                y2="25"
                                                data-name="New Gradient Swatch"
                                                xlinkHref="#a"
                                            ></linearGradient>
                                            <linearGradient
                                                id="c"
                                                x2="31.01"
                                                y1="16"
                                                y2="16"
                                                data-name="New Gradient Swatch"
                                                xlinkHref="#a"
                                            ></linearGradient>
                                            <path
                                                fill="url(#a)"
                                                d="M2 10c.55 0 1-.45 1-1V7c0-.55.45-1 1-1h2c.55 0 1-.45 1-1s-.45-1-1-1H4C2.35 4 1 5.35 1 7v2c0 .55.45 1 1 1zm26-6h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1 .45 1 1v2c0 .55.45 1 1 1s1-.45 1-1V7c0-1.65-1.35-3-3-3z"
                                                data-original="url(#a)"
                                            ></path>
                                            <path
                                                fill="url(#b)"
                                                d="M6 26H4c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 1.65 1.35 3 3 3h2c.55 0 1-.45 1-1s-.45-1-1-1zm24-4c-.55 0-1 .45-1 1v2c0 .55-.45 1-1 1h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c1.65 0 3-1.35 3-3v-2c0-.55-.45-1-1-1z"
                                                data-original="url(#b)"
                                            ></path>
                                            <g fill="url(#c)">
                                                <path d="M16 7C9.83 7 4.13 10.26 1.13 15.5c-.18.31-.18.69 0 .99 3 5.25 8.7 8.5 14.87 8.5s11.87-3.26 14.87-8.5c.18-.31.18-.69 0-.99-3-5.25-8.7-8.5-14.87-8.5zM3.17 16a14.77 14.77 0 014.98-4.84C7.42 12.63 7 14.29 7 16s.41 3.37 1.15 4.84C6.15 19.65 4.43 18 3.17 16zm8.7 6.43c-1.79-1.51-2.86-3.89-2.86-6.43s1.07-4.92 2.86-6.43C13.2 9.2 14.59 9 16.01 9s2.81.2 4.14.57c1.79 1.51 2.86 3.89 2.86 6.43s-1.07 4.92-2.86 6.43c-1.33.37-2.72.57-4.14.57s-2.81-.2-4.14-.57zm11.99-1.59c.73-1.47 1.15-3.13 1.15-4.84s-.41-3.37-1.15-4.84c2 1.19 3.72 2.84 4.98 4.84a14.77 14.77 0 01-4.98 4.84z"></path>
                                                <path d="M16.83 15h-1.67a.67.67 0 010-1.34h3.33c.55 0 1-.45 1-1s-.45-1-1-1h-1.5v-.67c0-.55-.45-1-1-1s-1 .45-1 1v.68c-1.39.09-2.5 1.24-2.5 2.65s1.2 2.67 2.67 2.67h1.67a.67.67 0 010 1.34H13.5c-.55 0-1 .45-1 1s.45 1 1 1H15V21c0 .55.45 1 1 1s1-.45 1-1v-.68c1.39-.09 2.5-1.24 2.5-2.65S18.3 15 16.83 15z"></path>
                                            </g>
                                        </svg>
                                        <span>{post.amount_formatted}</span>
                                    </div>
                                : ''}
                                <div className="profile-audio-icon-sec">
                                    <Image
                                        className="profile-audio-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-home/icon/audio-icon.png"
                                        }
                                    />
                                </div>
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                )
            ) : ("")
            }
        </>
    );
}

const mapStateToPros = (state) => ({});

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(ProfileSinglePost);

