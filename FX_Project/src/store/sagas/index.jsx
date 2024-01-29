import { all, fork } from "redux-saga/effects";

import UserSaga from "./UserSaga";
import ChangePasswordSaga from "./ChangePasswordSaga";
import SubscriptionSaga from "./SubscriptionSaga";
import CardsSaga from "./CardsSaga";
import BankAccountSaga from "./BankAccountSaga";
import KycDocumentSaga from "./KycDocumentSaga";
import WalletSaga from "./WalletSaga";
import TransactionSaga from "./TransactionSaga";
import WithDrawSaga from "./WithDrawSaga";
import PageSaga from "./PageSaga";
import PostSaga from "./PostSaga";
import ErrorSaga from "./ErrorSaga";
import FollowSaga from "./FollowSaga";
import VerificationDocumentSaga from "./VerificationDocumentSaga";
import CommentsSaga from "./CommentsSaga";
import FavSaga from "./FavSaga";
import BookmarkSaga from "./BookmarkSaga";
import SendTipSaga from "./SendTipSaga";
import HomeSaga from "./HomeSaga";
import OtherUserSaga from "./OtherUserSaga";
import PostLikesSaga from "./PostLikesSaga";
import ChatSaga from "./ChatSaga";
import NotificationSaga from "./NotificationSaga";
import VideoCallSaga from "./VideoCallSaga";
import LiveVideoSaga from "./LiveVideoSaga";
import PrivateCallSaga from "./PrivateCallSaga";
import CategorySaga from "./CategorySaga";
import ReferralSaga from "./ReferralSaga";
import ChatAssetSaga from "./ChatAssetSaga";
import UserCategorySaga from './UserCategorySaga'
import StoriesSaga from './StoriesSaga'
import ProductOwnerSaga from './ProductOwnerSaga'
import ProductsSaga from './ProductsSaga'
import VodVideosSaga from './VodVideosSaga'
import SessionSaga from "./SessionSaga"

export default function* rootSaga() {
  yield all([fork(UserSaga)]);
  yield all([fork(ChangePasswordSaga)]);
  yield all([fork(SubscriptionSaga)]);
  yield all([fork(CardsSaga)]);
  yield all([fork(BankAccountSaga)]);
  yield all([fork(KycDocumentSaga)]);
  yield all([fork(WalletSaga)]);
  yield all([fork(TransactionSaga)]);
  yield all([fork(WithDrawSaga)]);
  yield all([fork(ErrorSaga)]);
  yield all([fork(PageSaga)]);
  yield all([fork(PostSaga)]);
  yield all([fork(FollowSaga)]);
  yield all([fork(VerificationDocumentSaga)]);
  yield all([fork(CommentsSaga)]);
  yield all([fork(FavSaga)]);
  yield all([fork(BookmarkSaga)]);
  yield all([fork(SendTipSaga)]);
  yield all([fork(HomeSaga)]);
  yield all([fork(OtherUserSaga)]);
  yield all([fork(PostLikesSaga)]);
  yield all([fork(ChatSaga)]);
  yield all([fork(NotificationSaga)]);
  yield all([fork(VideoCallSaga)]);
  yield all([fork(LiveVideoSaga)]);
  yield all([fork(PrivateCallSaga)]);
  yield all([fork(CategorySaga)]);
  yield all([fork(ReferralSaga)]);
  yield all([fork(ChatAssetSaga)]);
  yield all([fork(UserCategorySaga)]);
  yield all([fork(StoriesSaga)]);
  yield all([fork(ProductOwnerSaga)]);
  yield all([fork(ProductsSaga)]);
  yield all([fork(VodVideosSaga)]);
  yield all([fork(SessionSaga)]);
}
