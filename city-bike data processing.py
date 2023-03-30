#!/usr/bin/env python
# coding: utf-8

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
df = pd.read_csv('2021-06.csv');
df

print(f'Total number of rows: {len(df.index)}');

# Remove all rows wit NULL values 
df1 = df.dropna()
# Count removed 
removed = len(df.index) - len(df1.index)

# remove duplicate rows
df2 = df1[~df1.duplicated(keep=False)].copy()
len(df2.index)

df2.dtypes

df2['Covered distance (m)'] = df['Covered distance (m)'].astype(int)
df2.dtypes

df2.plot(kind = 'scatter', x = 'Covered distance (m)', y = 'Duration (sec.)')

plt.show()

df3 = df2[df2['Covered distance (m)'] >= 10]
len(df3.index)

df4 = df3[df3['Duration (sec.)'] >= 10]
len(df4.index)

# remove rows with duration longer than 5 hours
df5 = df4[df4['Duration (sec.)'] < 18000]
df5


df5.plot(kind = 'scatter', x = 'Covered distance (m)', y = 'Duration (sec.)')

plt.show()

