### Theory


<center>
  <img src="images/th1.png" height="220px">
  
Fig. 1. Silicon controlled rectifier/ Thyristor.

</center>
<br>
A thyristor typically consists of four layers, forming a P-N-P-N structure. The three terminals of a thyristor are: anode (A), cathode (K), and gate (G).<br>

The thyristor operates in four modes: Forward Blocking, Forward Conduction, Reverse Blocking, and Reverse Breakdown.<br>

The gate terminal controls the triggering of the thyristor. A small current applied to the gate terminal can turn the device on. Once turned ON, the gate loses control and the thyristor remains conducting until the current drops below the holding current level.<br>

The rectifier converts AC into DC. Thyristor-based rectifiers are widely used in various industrial applications due to their efficiency, controllability, and reliability.<br>

Thyristor-based rectifiers offer the advantage of controlled rectification, allowing precise control over the output voltage and current. By adjusting the firing angle, the average load voltage of the rectifier can be varied thus enabling smooth control of power delivered to the load.<br>

<br>

<center>
  <img src="images/th2.png" height="460px">
  
<br>Fig. 2. Circuit diagram of controlled rectifier.

</center>
<br>
The output voltage and power delivered can be controlled by changing the firing angle as shown in Fig. 3.
<br><br>


<table border="0" align="center" style="width:100%; border:none;">
  <tr>
<td style="width:50%">
<center>

<img src="images/th3.png">
<br><br>
Fig. 3(a). Positive-half cycle.
<br><br>
</center>
</td>
<td style="width:50%">
  
<center>

<img src="images/th4.png">
<br><br>
Fig. 3(b). Negative-half cycle.
<br><br>
</center> 
    </td>
  </tr>
</table>
<br>

<div style="float: left; width:100%;"><br>
Fig. (2) shows a fully controlled bridge rectifier, which uses four thyristors to control the load voltage. Thyristors T<sub>1</sub> and T<sub>2</sub> must be fired simultaneously during the positive half cycle while Thyristors T<sub>3</sub> and T<sub>4</sub> must be fired simultaneously during the negative half cycle of the source voltage. All the thyristors must be given firing pulses of suitable pulse sequence.
<br><br>

**WITH R-LOAD**

<br>Fig.4a shows steady-state waveforms of controlled rectifier with R-load and based on these waveforms various equations are formulated. The average value of the output load voltage and current are:

<br>
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th5.png" height="60px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(1)
</div>
<br>

<div style="float: left; width:100%;">
&nbsp;
</div>

<div style="float: left; width:50%;">
  <img src="images/th6.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(2)

</div>
<br>

<div style="float: left; width:100%;"><br>
The RMS value of the output voltage V_rms and current I_rms are:<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th7.png" height="70px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(3)

</div>
<br>

<div style="float: left; width:100%;"><br>
&nbsp;
</div>

<div style="float: left; width:50%;">
  <img src="images/th8.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(4)

</div>
<br>

<div style="float: left; width:100%;"><br>
  The power delivered to the load is:
</div><br>

<div style="float: left; width:50%;">
  <img src="images/th9.png" height="50px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(5)

</div>
<br>

<div style="float: left; width:100%;"><br>
Note: The RMS current of the source is the same as the RMS current of the load.<br>
Apparent power is:
</div><br>

<div style="float: left; width:50%;">
  <img src="images/th10.png" height="50px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(6)

</div>
<br>

<div style="float: left; width:100%;"><br>
Input Power factor is: 
<br>
</div>


<div style="float: left; width:50%;">
  <img src="images/th11.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(7)

</div>
<br><br>

<table border="0" align="center" style="width:100%; border:none;">
  <tr>
<td style="width:50%">
<center>

<img src="images/th12.png">
<br><br>
(a) Waveforms with R-Load.
<br><br>
</center>
</td>
<td style="width:50%">
  
<center>

<img src="images/th13.png">
<br><br>
(b) Waveforms with RL-Load.
<br><br>
</center> 
    </td>
  </tr>
</table>

<br>
<center>Fig. 4. Steady-state waveforms of controlled rectifier.</center>


<div style="float: left; width:100%;">
<br>

**WITH RL-LOAD**

<br>Fig. 4b shows steady-state waveforms of controlled rectifier with RL-load and based on these waveforms various equations are formulated:

<br>
</div>

<br>
<div style="float: left; width:100%;"><br>
The average (DC) output voltage and current are:
<br><br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th14.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(8)

</div>
<br>

<div style="float: left; width:100%;"><br>
&nbsp;
</div>

<div style="float: left; width:50%;">
  <img src="images/th15.png" height="65px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(9)

</div>
<br>

<div style="float: left; width:100%;"><br>
The RMS value of the output voltage and current waveforms are formulated as:
<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th16.png" height="78px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(10)

</div>
<br>

<div style="float: left; width:100%;"><br>
&nbsp;
</div>

<div style="float: left; width:50%;">
  <img src="images/th17.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(11)

</div>
<br>

<div style="float: left; width:100%;"><br>
The input source current Fourier series expansion is:
<br><br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th18.png" height="50px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(12)

</div>
<br>

<div style="float: left; width:100%;"><br>
Where n = 1,2,3 ....<br>
The RMS value of the n<sup>th</sup> harmonic input current is:
<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th19.png" height="70px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(13)

</div>
<br>

<div style="float: left; width:100%;"><br>
RMS value of the fundamental current is:
<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th20.png" height="65px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(14)

</div>
<br>

<div style="float: left; width:100%;"><br>
The RMS value of input current is:
<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th21.png" height="80px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(15)

</div>
<br>

<div style="float: left; width:100%;"><br>
Harmonic factor:
<br><br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th22.png" height="70px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(16)

</div>
<br>

<div style="float: left; width:100%;"><br>
Displacement factor:
<br><br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th23.png" height="45px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(17)

</div>
<br>

<div style="float: left; width:100%;"><br>
Power factor:
<br><br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th24.png" height="75px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(18)

</div>
<br>

<div style="float: left; width:100%;"><br>
Output power:
<br><br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th25.png" height="55px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(19)

</div>

<div style="float: left; width:100%;">
  
#### ("For more Information on mathematical analysis, see references")
<br></div>
