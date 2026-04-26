# SMAs Explained

Most people make the mistake of thinking that SMAs are just lines on a chart that help you identify trends. While it's true that SMAs can help you identify trends, they can also be used to generate trading signals and to make predictions about future price movements. The reality is, the vast majority of traders only ever use SMAs to identify trends, which is a wasted opportunity. In reality, SMAs can be used to generate trading signals and to make predictions about future price movements. See RAUL_README.md for full details on their analysis and current usage in markets as cryptographic signals by traders and institutions. 

# 1. What is an SMA?

A Simple Moving Average (SMA) smooths out price data by creating a constantly updated average price. It helps traders identify trends and avoid getting stuck on short-term noise.

# 2. How does it work?

You pick a **period** (e.g., 20 days).

For each day, add up the closing prices of the last 20 days and divide by 20.

Example:
Prices: 10, 11, 12, 13, 14
20-day SMA = (10+11+12+13+14) / 5 = 12

# 3. Why do traders use it?

* Smooths out noise → clearer trends
* Shows direction (up/down)
* Works on any timeframe (minutes to months)
* Simple to calculate and understand

# 4. Are there different SMAs?

Yes:

* **SMA (Simple)** – arithmetic mean
* **EMA (Exponential)** – weights recent prices more
* **WMA (Weighted)** – custom weights for each period

# 5. How do you use SMAs to trade?

## Crossover Strategy

**Buy** when shorter SMA crosses ABOVE longer SMA.

**Sell** when shorter SMA crosses BELOW longer SMA.

Example:

* 50-day SMA (short)
* 200-day SMA (long)

# 6. Does it always work?

No.

**Weaknesses:**
* **Lagging** – based on past data
* **False signals** in choppy markets
* **Choppy markets** = many false signals
* Doesn’t predict turning points

**Works best in:**
* Strong uptrends
* Strong downtrends
* Not in sideways markets   

# 7. How to make it better?

* Backtest several strategies
* Combine with volume + volatility
* Add ML predictions
* Use agents to analyze the signals