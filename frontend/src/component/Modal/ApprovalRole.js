import React from 'react';
import { Backdrop, Modal, Fade, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { IoCloseSharp } from 'react-icons/io5';

const ApprovalRole = ({ onHide, show }) => {

    const approval = [
        {
            title: "Length of relationship with the Bank",
            buttons: [
                { button1: 'For more than 15 years' },
                { button2: 'For more than 10 years but less than 15 years' },
                { button3: 'For more than 5 years but less than 10 years' },
                { button4: 'For more than 1 years but less than 5 years' },
                { button5: 'Less than 1 year' },
            ]
        },
        {
            title: "Experience of management in the Industry",
            buttons: [
                { button1: 'The management has exposure to the business or industry for more than 15 years' },
                { button2: 'The management has been in the business or industry for more than 10 years but less than and equal to 15 years.' },
                { button3: 'Fairly experienced with business or industry exposure of more than 5 years but less than and equal to 10 years' },
                { button4: 'Industry experience of more than 1 years but less than and equal to 5 years' },
                { button5: 'Experience of less than 1 year in the business or industry' },
            ]
        },
        {
            title: "Integrity, Credentials and background of management",
            buttons: [
                { button1: 'Management has a very high reputation with a prominent track record. It has very high degree of integrity and is held in great esteem amidst peers, clientele and market and adheres to best standards of ethics and corporate governance and has demonstrated high level of commitment to environmental and social issues of the industry and is regarded as a leader.' },
                { button2: 'Management is well respected with good business history. It is considered ethical by clientele and market and adheres to more than satisfactory level or standards of ethics and corporate governance including active involvement of senior management in resolving environmental and social risks.' },
                { button3: 'Management has moderate reputation in the market and adheres to minimum or required standards of ethics and corporate governance.' },
                { button4: 'Management enjoys limited reputation and has some cases of customer / creditor dissatisfaction and adherence to the standards of ethics and corporate governance is low' },
                { button5: 'Very Low or Negligible	Integrity of management is suspect and is perceived to be severely lacking in integrity and has a very bad track record and cases of questionable integrity have been observed in public knowledge and the degree of comfort with regard to information provided by the company is very low or negligible' },
            ]
        },
        {
            title: "Planning and Operational Execution Skills",
            buttons: [
                { button1: 'Strategic objectives in place, planning, budgeting and controls are in place, achievement of targets are exceptional (leadership position in the industry / market)' },
                { button2: 'Strategic objectives in place, planning, budgeting and controls are in place, achievement of targets are above average (compared to industry and peers)' },
                { button3: 'Strategic objectives in place, planning, budgeting and controls are not emphasized, achievement of targets are just about average (comparable to industry and peers)' },
                { button4: 'Strategic objectives not in place, planning, budgeting and controls are not emphasized, achievement of targets are below average (compared to industry and peers)' },
                { button5: 'Strategic objectives are not in place, planning, budgeting and controls not emphasized, achievement of targets has not been observed (compared to industry and peers)' },
            ]
        },
        {
            title: "Financial Flexibility",
            buttons: [
                { button1: 'Company has exceptional and proven financial capabilities in accessing alternative (internal) sources of funds in case of crisis situations; management has focussed on internal accruals and ensured funds are available for future business use' },
                { button2: 'Company has above average financial capabilities in accessing alternative (internal or group) sources of funds in case of crisis situations' },
                { button3: 'Company has average financial capabilities in accessing alternative (internal or external) sources of funds in case of crisis situations' },
                { button4: 'Company has below average financial capabilities in accessing alternative sources of funds in case of crisis situations; non availability of internal sources but can tap external sources in a limited way for funds' },
                { button5: 'Company has inadequate financial capabilities in accessing alternative sources of funds in case of crisis situations; non availability of internal or external sources of funds' },
            ]
        },
        {
            title: "Past Payment Record and Track record",
            buttons: [
                { button1: 'All past debt obligations serviced on time or before' },
                { button2: 'Debt obligation mostly made on time within 30 days' },
                { button3: 'A few debt obligation(s) delayed but settled within 60 days and / or New Customer' },
                { button4: 'A few debt obligation(s) delayed more than 60 days' },
                { button5: 'Several cases of non-payment. Classified in default category i.e., more than 90 days past due or Customer is new and there is no past payment record' },
            ]
        },
        {
            title: "Level of Succession Plan",
            buttons: [
                { button1: 'Exceptional succession planning process, Access to large managerial pool of qualified and experienced internal candidates for Senior Management positions' },
                { button2: 'Above average (better) succession planning process with few candidates available for assuming leadership positions' },
                { button3: 'Adequate succession planning process with one or two candidates available for leadership positions' },
                { button4: 'Current managerial pool is not sufficient to replace current senior management positions, below average succession planning process' },
                { button5: 'Inadequate succession planning process, unavailability of internal candidates to assume leadership positions, have to rely on external candidates for leadership positions' },
            ]
        },
        {
            title: "Business Type",
            buttons: [

                { button1: 'Government organisation / Public Sector Enterprise' },
                { button2: 'Public Limited company listed on Stock Exchange' },
                { button3: 'Private Limited Company' },
                { button4: 'Partnership firm' },
                { button5: 'Proprietorship firm' },
            ]
        },
        {
            title: "Product market",
            buttons: [
                { button1: 'Corporate produces/provides essential services or a commodity with a world wide market' },
                { button2: 'Corporate produces/provides essential services or a commodity with a regional (pan country) market' },
                { button3: 'Corporate produces/provides essential services or a commodity with a local market' },
                { button4: 'Corporate produces/provides specialist products or services with a limited market or products or services are demanded by only one or a few buyers or is not generally sold on an organised market' },
            ]
        },
        {
            title: "Access to Resources",
            buttons: [

                { button1: 'Raw materials / man power / stocks easily available & price is steady. Substitutes inputs available. No risk in sourcing imported raw materials.' },
                { button2: 'Raw materials / man power / stocks generally available at more or less steady price. Has few alternate usage but supply is adequate.' },
                { button3: 'Raw materials / man power / stocks availability ensured by tie-ups with suppliers. By and large the price variations can be passed on to the users.' },
                { button4: 'highly dependent on critical raw materials. Timely availability is critical. Needs large stocking levels.' },
                { button5: 'The availability of raw materials / man power / stocks extremely seasonal. There are extreme price fluctuations. Production loss has occurred on account of scarcity of raw materials' },
            ]
        },
        {
            title: "Threat of Substitutes",
            buttons: [

                { button1: 'Perfect substitutes available, fast obsolescence rate' },
                { button2: 'Product(s) is(are) having perfect substitutes, users of the product have other alternatives' },
                { button3: 'Few substitutes available, however company is maintaining its market share by adopting comparable practices of industry and customers prefer the product of the company due to preferences and/or values attached to that product' },
                { button4: 'Substitute products available, users of the product have limited alternatives, company is best in industry to update its product, quality etc. according to changing market conditions' },
                { button5: 'No substitutes available in the market, company is leader with best products in the market' },
            ]
        },
        {
            title: "Level of Significance of Industry",
            buttons: [

                { button1: 'Industry contributing more than 10% to the GDP or economy of the Country' },
                { button2: 'Industry contributing more than 7% but less than or equal to 10% of the GDP or economy of the Country' },
                { button3: 'Industry contributing more than 5% but less than or equal to 7% of the GDP or economy of the Country' },
                { button4: 'Industry contributing more than 3% but less than or equal to 5% of the GDP or economy of the Country' },
                { button5: 'Industry contributing less than or equal to 3% of the GDP or economy of the Country' },
            ]
        },
        {
            title: "Industry Trend",
            buttons: [

                { button1: 'Trend shows constant growth or increase over the last 5 years' },
                { button2: 'Trend depicts increasing pattern over the last 3 years' },
                { button3: 'Trend is stable and steady' },
                { button4: 'Trend shows decline in recent past' },
                { button5: 'Trend shows heavy decrease or a declining trend' },
            ]
        },
        {
            title: "Extent of Competition",
            buttons: [

                { button1: 'The industry has a monopoly structure, with the prospect of new entrants in the medium term being unlikely. No threat at all from imports' },
                { button2: 'Industry is characterized by a few large players accounting for the bulk of market share. Capital investment involved is likely to discourage significant increase in competition in the medium term. Absence of serious threat from imports' },
                { button3: 'Industry has a fairly fragmented structure. Moderate entry barriers in the form of technology/ capital investment. Fair extent of value addition restricts easy access to the unorganized sector / Threat from imports exists' },
                { button4: 'Lots of players i.e.., highly fragmented industry with further scope of new players to enter the industry. Processes are very easily replicable leading to presence of large, cost-competitive unorganized sector/ Significantly lower cost of imports render domestic producers unviable' },
                { button5: 'Extremely competitive industry, with a near absence of entry barriers, in the form of investment/ technology, etc.. No player is capable of building a significant market share in the industry' },
            ]
        },
        {
            title: "Impact of Change in Technology",
            buttons: [

                { button1: 'Least Impact' },
                { button2: 'Marginal Impact' },
                { button3: 'Moderate Impact' },
                { button4: 'High Impact' },
                { button5: 'Very High Impact' },
            ]
        },
        {
            title: "Environmental and Social Risks",
            buttons: [

                { button1: 'No Environmental or Social risk or impacts' },
                { button2: 'Negligible Environmental or Social risk or impacts' },
                { button3: 'Moderate Environmental or Social risk or impacts and adequate time bound management plans are being implemented which will mitigate the risks and impacts.' },
                { button4: 'High Environmental or Social risk or impacts, but adequate management plans are being implemented by an able team to mitigate the risks and impacts. This will keep the risks largely under control. There is need for close watch and more frequent monitoring and reassessing the risks at every renewal of line/facilities.' },
                { button5: 'Major Environmental or Social risk or impacts some of which could be irreversible or unprecedented. There is need for extreme care and stronger diligence to be exercised during renewals of lines/facilities, including seeking services of expert E&S specialists.' },
            ]
        },
    ]

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className='model'
                open={show}
                onClose={onHide}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={show} >
                    {/* <Fade > */}
                    <div className='modal-content'>
                        <div className='d-flex justify-content-between'>
                            <h2 id="transition-modal-title" className='modal-title'>Performance Risk</h2>
                            <IoCloseSharp onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product approvalrolemodal p-0 mt-3' id="transition-modal-description" style={{ height: '80vh', overflow: 'auto' }}>
                            {
                                approval.map((item) => (
                                    <div className='form mb-3'>
                                        <h2 className='mb-3'>{item.title}</h2>
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                            >
                                                {item.buttons?.map((btnitem, i) =>
                                                    <FormControlLabel value={btnitem[`button${i + 1}`]} control={<Radio />} label={btnitem[`button${i + 1}`]} />
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                            <button onClick={() => { }} className='footer_next_btn'>Save</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ApprovalRole