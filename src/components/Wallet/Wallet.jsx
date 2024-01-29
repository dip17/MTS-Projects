import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Table, Image } from "react-bootstrap";
import "./Wallet.css";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import { fetchAllTransactionStart } from "../../store/actions/TransactionAction";
import WithdrawModal from "../helper/WithdrawModal";
import AddWalletAmountModal from "../Model/PaymentModal/AddWalletAmountModal";
import NoDataFound from "../NoDataFound/NoDataFound";
import WalletLoader from "../Loader/WalletLoader";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import CommonCenterLoader from "../Loader/CommonCenterLoader";

const Wallet = (props) => {

	const [colVal, setColValue] = useState(4);

	useEffect(() => {
		props.dispatch(fetchWalletDetailsStart());
		props.dispatch(fetchAllTransactionStart());
		setColValue(configuration.get("configData.is_referral_enabled") == 1 ? 3 : 4);
	}, []);

	const [withdrawModal, setWithdrawModal] = useState(false);

	const [addWalletAmountModal, setAddWalletAmountModal] = useState(false);

	const closeWithdrawModal = () => {
		setWithdrawModal(false);
	};

	const closeAddWalletAmountModal = () => {
		setAddWalletAmountModal(false);
	};

	return (
		<>
			<div className="wallet-sec">
				{props.wallet.loading ? (
					<WalletLoader></WalletLoader>
				) : (
					<Container>
						<Row>
							<Col sm={12} md={12}>
								<div className="wallet-header-sec">
									<Row>
										{/* <Col sm={12} md={6} xl={3}>
											<div className="wallet-header-card">
												<Image
														src={
															window.location.origin +
															"/assets/images/icons/wallet-active.svg"
														}
														className="credit-img"
													/>
												<div className="wallet-header-details">
													<h5>{t("total_balance")}</h5>
													<h3>
														{props.wallet.data.user_wallet.total_formatted}
													</h3>
												</div>
											</div>
										</Col> */}
										<Col sm={12} md={6} xl={3}>
											<div className="wallet-header-card">
												<Image
													src={
														window.location.origin +
														"/assets/images/icons/wallet-dollar.svg"
													}
													className="credit-img"
												/>
												<div className="wallet-header-details">
													<h5>{t("wallet_balance")}</h5>
													<h3>
														{props.wallet.data.user_wallet.remaining_formatted}
														{/* <span className="amount-decimal">.76500293</span>
														<span className="amount-abb">BTC</span> */}
													</h3>
												</div>
											</div>
										</Col>
										{configuration.get("configData.is_referral_enabled") == 1 ?
											<Col sm={12} md={6} xl={3}>
												<div className="wallet-header-card">
													<Image
														src={
															window.location.origin +
															"/assets/images/icons/wallet-dollar.svg"
														}
														className="credit-img"
													/>
													<div className="wallet-header-details">
														<h5>{t("referral_balance")}</h5>
														<h3>
															{props.wallet.data.user_wallet.referral_amount_formatted}
															{/* <span className="amount-decimal">.76500293</span>
															<span className="amount-abb">BTC</span> */}
														</h3>
													</div>
												</div>
											</Col>
											: ''}

										<Col sm={12} md={6} xl={3}>
											<div className="edit-save">
												<Button
													className="send-btn-white mb-3"
													onClick={() => setAddWalletAmountModal(true)}
												>
													{configuration.get("configData.is_only_wallet_payment") == 1 ? t("add_wallet_token") : t("add_wallet_amount")}
												</Button>
												<Button
													className="send-btn-white"
													onClick={() => setWithdrawModal(true)}
												>
													{t("withDraw")}
												</Button>
											</div>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Container>
				)}
			</div>
			<div className="trans-table-sec">
				<Container>
					<Row>
						<Col sm={12} md={12}>
							<h4>{t("transactions")}</h4>
							<div className="trans-table">
								<Table borderedless responsive>
									<thead>
										<tr>
											<td>{t("status")}</td>
											<td>{t("paid_token")}</td>
											<td>{t("service_fee")}</td>
											<td>{t("payment_mode")}</td>
											<td>{t("received_by")}</td>
											<td>{t("payment_id")}</td>
											<td>{t("message")}</td>
										</tr>
									</thead>
									<tbody>
										{props.transaction.loading ? (
											<CommonCenterLoader></CommonCenterLoader>
										) : props.transaction.data.history.length > 0 ? (
											props.transaction.data.history.map((data) => (
												<tr>
													<td>{data.status_formatted}</td>
													{configuration.get("configData.is_only_wallet_payment") == 0 ?
														<>
															<td className="amount">
																{data.paid_amount_formatted}{" "}
																{/* <span className="amout-abb">STRAT</span> */}
															</td>
															<td className="amount">
																{data.admin_amount_formatted}
																{/* <span className="amout-abb">STRAT</span> */}
															</td>
														</>
														:
														<>
															<td className="amount">
																{data.token_formatted}{" "}({data.requested_amount_formatted})
															</td>
															<td className="amount">
																{data.admin_token_formatted}
															</td>
														</>
													}

													<td className="amount">
														<span className="text-capitalize">
															{data.payment_type}{" "}
														</span>
														{/* <span className="amout-abb text-muted">TYPE</span> */}
													</td>
													<td>

														{data.received_from_username
															? data.received_from_username
															: "-"}
													</td>
													<td>{data.payment_id}</td>
													<td>{data.message.split('-')[0]}</td>
													{/* <td>
															<Badge className="unconfirmed-badge">
																unconfirmed
															</Badge>
															<span>now</span>
														</td> */}
												</tr>
											))
										) : (
											<NoDataFound></NoDataFound>
										)}
									</tbody>
								</Table>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<WithdrawModal
				withdrawModal={withdrawModal}
				closeWithdrawModal={closeWithdrawModal}
				payments={props.wallet}
			/>
			{addWalletAmountModal ?
				<AddWalletAmountModal
					paymentsModal={addWalletAmountModal}
					closepaymentsModal={closeAddWalletAmountModal}
					payments={props.wallet}
				/>
				: null
			}
		</>
	);
};

const mapStateToPros = (state) => ({
	wallet: state.wallet.walletData,
	transaction: state.transaction.allTransaction,
});

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(Wallet);
