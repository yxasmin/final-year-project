import './AboutUs.css';
import { Link } from 'react-router-dom';
import { Recycle, Heart, Leaf, RefreshCw } from 'lucide-react';

export default function AboutUs() {
    return (
        <div className="about-page">

            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero__content">
                    <p className="about-hero__eyebrow">Our Story</p>
                    <h1 className="about-hero__title"> Fashion that<br />goes in circles.</h1>
                    <p className="about-hero__sub">
                        At Rot8te we believe that the clothes we wear should not only make us look good but also feel good about our impact on the planet. 
                        We exist to make sustainable fashion accessible, affordable and stylish for everyone. 
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="about-section about-section--alt">
                <div className="about-section__inner">
                    <div className="about-section__text">
                        <p className="about-section__label">Our Mission</p>
                        <h2 className="about-section__title">Keeping clothes in use, out of landfills.</h2>
                        <p className="about-section__body">
                           The fashion industry is one of the largest contributors to environmental pollution, with millions of tonnes of clothing ending up in landfills each year,
                           discarded after only a few wears. At Rot8te we believe that the solution is to buy less and choose better. By offering high-quality, pre-loved clothing at affordable prices, we aim to extend the life of garments and reduce the demand for new production.
                        </p>
                        <p className="about-section__body">
                            Our platform connects you with ethical and sustainable brands, helping you find your nearest recycling and donation points, rewarding you for making eco-friendly choices, and providing tips and resources to help you on your sustainable fashion journey. 
                            Small changes can make a big difference, and together we can protect our planet. Join us in our mission to create a more circular fashion industry and make a positive impact on the world.
                        </p>
                    </div>
                    <div className="about-section__visual">
                        <div className="about-stat-stack">
                            <div className="about-stat">
                                <span className="about-stat__number">92M</span>
                                <span className="about-stat__label">tonnes of textile waste produced each year globally</span>
                                </div>
                            <div className="about-stat">
                                <span className="about-stat__number">10%</span>
                                <span className="about-stat__label">of global carbon emissions come from the fashion industry.</span>
                                </div>

                                <div className="about-stat">
                                    <span className="about-stat__number">3,500L</span>
                                    <span className="about-stat__label">of water used to produce one pair of jeans.</span>

                                </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="about-section">
                <div className="about-section__inner about-section__inner--center">
                    <p className="about-section__label">What we Stand For</p>
                    <h2 className="about-section__title">Our commitments.</h2>
                    <div className="about-values">
                        <div className="about-value">
                            <div className="about-value__icon"><Recycle size={28} strokeWidth={1.5} /></div>
                            
                            <h3 className="about-value__title">Circular Thinking</h3>
                            <p className="about-value__body">
                              We support and promote circular fashion practices, such as recycling and upcycling, to reduce waste and extend the life of garments.   
                            </p>
                        </div>
                        <div className="about-value">
                            <div className="about-value__icon"><Leaf size={28} strokeWidth={1.5} /></div>
                            <h3 className="about-value__title">Sustainability First</h3>
                            <p className="about-value__body">
                                Every brand we feature is assessed for their environmental and ethical practices.
                                We only platform brands that use organic, recycled, upcycled, natural or ethically sourced materials.</p>
                        </div>
                        <div className="about-value">
                            <div className="about-value__icon"><Heart size={28} strokeWidth={1.5} /></div>
                            <h3 className="about-value__title">People & Planet</h3>
                            <p className="about-value__body">
                                Sustainability is not just about the physical environment, but also about the people who make our clothes. We are committed to supporting brands that prioritise fair labor practices and social responsibility.</p>
                        </div>
                        <div className="about-value">
                            <div className="about-value__icon"><RefreshCw size={28} strokeWidth={1.5} /></div>
                            <h3 className="about-value__title">Rewarding Change</h3>
                            <p className="about-value__body">
                                We believe positive habits deserve recognition. Our platform rewards users for making sustainable fashion choices, such as donating clothes or shopping from ethical brands, to encourage and incentivise eco-friendly behavior.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="about-section about-section--alt">
                <div className="about-section__inner about-section__inner--center">
                    <p className="about-section__label">How Rot8te Works</p>
                    <h2 className="about-section__title">Four ways to make a difference.</h2>

                    <div className="about-steps">
                        <div className="about-step">
                            <span className="about-step__number">01</span>
                            <h3 className="about-step__title">Discover</h3>
                            <p className="about-step__body">Browse our curated shop of ethical and sustainable brands.</p>
                        </div>

                        <div className="about-step">
                            <span className="about-step__number">02</span>
                            <h3 className="about-step__title">Save</h3>
                            <p className="about-step__body">Favourite the pieces you love. Track your saved items and see the sustainability impact of your choices on your profile.</p>
                        </div>

                        <div className="about-step">
                            <span className="about-step__number">03</span>
                            <h3 className="about-step__title">Recycle</h3>
                            <p className="about-step__body">Use our recycling locator to find your nearest clothing donation and textile recycling drop-off points.</p>

                        </div>

                        <div className="about-step">
                            <span className="about-step__number">04</span>
                            <h3 className="about-step__title">Earn</h3>
                            <p className="about-step__body">Earn badges and achievements for making sustainable fashion choices, such as donating clothes or shopping from ethical brands to gain achievements.</p>
                            </div>
                        </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="about-cta">
                <h2 className="about-cta__title">Ready to make a difference?</h2>
                <p className="about-cta__sub">Join us in building a more circular, sustainable wardrobe.</p>
                <div className="about-cta__buttons">
                    <Link to="/products" className="about-cta__btn about-cta__btn--primary">Shop Now</Link>
                    <Link to="/register" className="about-cta__btn about-cta__btn--outline">Create an Account</Link>
                    </div>
            </section>
        </div>
    );

}