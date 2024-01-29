import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ProfileLoader = () => {
    return (
        <div className="new-home-box">
            {/* SideBar */}
            <div className="new-home-sidebar">
                <div className="profile-logo-sec">
                    <Skeleton width={136} height={28} />
                </div>

                <div className="sibebar-header-sec">
                    <div className="">
                        <Skeleton width={70} height={70} className="sidebar-user-img profile-image" />
                    </div>

                    <Skeleton containerClassName="w-100" height={22} count={2} />

                    <div className="sidebar-total-count-info-box">
                        <div className="sidebar-total-count-card w-75">
                            <Skeleton containerClassName="w-100" height={10} count={2} />
                        </div>
                        <div className="sidebar-total-count-card w-75">
                            <Skeleton containerClassName="w-100" height={10} count={2} />
                        </div>
                        <div className="sidebar-total-count-card w-75">
                            <Skeleton containerClassName="w-100" height={10} count={2} />
                        </div>
                    </div>
                </div>
                <div className="sidebar-links">
                    <Skeleton containerClassName="w-100" height={40} count={4} />
                </div>
                <div className="sidebar-social-links">
                    <Skeleton
                        containerClassName="d-flex"
                        height={24}
                        width={24}
                        count={9}
                        style={{ borderRadius: "50%", marginRight: "2px" }} />
                </div>
            </div>

            {/* Main Content */}
            <div className="new-home-main-wrapper">
                <div className="user-cover-img-sec">
                    <Skeleton
                        className="profile-cover-loader"
                    />
                    <div className="website-hide-sec">
                        <Skeleton
                            width={70}
                            height={70}
                            className="single-profile-user-img profile-image"
                            containerClassName="single-profile-user-img" />
                    </div>
                </div>
                <div className="user-right-content-sec">
                    <div className="user-right-info">
                        <div className="user-info-desc">
                            <Skeleton count={2} />
                        </div>
                        <div className="user-info-list">
                            <Skeleton 
                            count={3} 
                            containerClassName="d-flex"
                            className="profile-info-loader"
                            />
                        </div>
                    </div>
                    <div className="user-subscription-plans-details">
                        <Skeleton containerClassName="w-100" height={40} count={2} />
                    </div>
                </div>
                <div className="mobile-display mt-3">
                    <div className="sidebar-links">
                        <div className="container">
                            <Skeleton
                                containerClassName="row gx-5"
                                className="col-6"
                                height={40}
                                count={4} />
                        </div>
                        <Skeleton
                            containerClassName="d-flex justify-content-center mt-3"
                            height={24}
                            width={24}
                            count={9}
                            style={{ borderRadius: "50%", marginRight: "2px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileLoader;