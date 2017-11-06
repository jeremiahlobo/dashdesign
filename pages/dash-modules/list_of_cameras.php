<!-- start camera list -->
  
  <div class="container">
    <section>
      <h2> Your Cameras </h2>

      <?php 
        include 'add_a_camera.php';
        ?>
      <div class="row">
        <div class="col s12">
            <div class="col s12 m6 l6">
            <div class="card sticky-action">
              <div class="card-image waves-effect waves-block waves-light">
                <!-- <img class="activator" src="images/office.jpg"> -->
                <video class="activator" width="auto" autoplay loop>
                  <source src="../assets/video/cars_detect.mp4" type="video/mp4">
                </video>
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">Camera 1<i class="material-icons right">more_vert</i></span>
                <p><a href="#"><em>More Info</em></a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Cam Info<i class="material-icons right">close</i></span>
                <p>Cam model : 39</p>
              </div>
              <div class="card-action">
                <a href="#event-stats" class="modal-trigger">Captured Events</a>
              </div>
            </div>
          </div>

          <div class="col s12 m6 l6">
            <div class="card sticky-action">
              <div class="card-image waves-effect waves-block waves-light">
                <!-- <img class="activator" src="images/office.jpg"> -->
                <video class="activator" width="auto" autoplay loop>
                  <source src="../assets/video/people_detect.mp4" type="video/mp4">
                </video>
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">Camera 2<i class="material-icons right">more_vert</i></span>
                <p><a href="#"><em>More Info</em></a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Cam Info<i class="material-icons right">close</i></span>
                <p>Cam model : ZM</p>
              </div>
              <div class="card-action">
                <a href="#event-stats" class="modal-trigger">Captured Events</a>
              </div>
            </div>
          </div>

          <div class="col s12 m6 l6">
            <div class="card sticky-action">
              <div class="card-image waves-effect waves-block waves-light">
                <!-- <img class="activator" src="images/office.jpg"> -->
                <video class="activator" width="auto" autoplay loop>
                  <source src="../assets/video/Objectpickup.mp4" type="video/mp4">
                </video>
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">Camera 3<i class="material-icons right">more_vert</i></span>
                <p><a href="#"><em>More Info</em></a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Cam Info<i class="material-icons right">close</i></span>
                <p>Cam model : ZM</p>

              </div>
              <div class="card-action">
                <a href="#event-stats" class="modal-trigger">Captured Events</a>
              </div>
            </div>
          </div>

        </div>
     </div>
     </section> 
</div>


<!--event stats this can be in another page -->
<!-- Modal Structure -->
  <div id="event-stats" class="modal">
    <div class="modal-content">
      <h4>Event Stats</h4>
      <section>
        <h4>Charts</h4>
        <section class="display-charts">
          <div class="row">
            <div class="col s12 m6">
                <div class="card">
                  <div class="card-content">
                    <canvas id="myChart"></canvas>
                  </div>
                </div>
            </div>
              <div class="col s12 m6">
                <div class="card">
                  <div class="card-content">
                    <canvas id="anotherChart"></canvas>
                  </div>
                </div>
            </div>
              <div class="col s12 m6">
                <div class="card">
                  <div class="card-content">
                    <canvas id="newChart"></canvas>
                  </div>
                </div>
            </div>
          </div>

        </section>
      </section>
      
      <section>
          <div class="row">
            <form class="col s12">
              <div class="input-field col s6">
                <input placeholder="Event Start Date" id="event_start" type="text" class="datepicker">
                <label for="event_start">From</label>
                
              </div>

              <div class="input-field col s6">
                <input placeholder="Time" id="event_time_start" type="text" class="timepicker">
                <label for="event_time_start">Time</label>
              </div>
            
              
                <div class="input-field col s6">
                <input placeholder="Event End Date" id="event_End" type="text" class="datepicker">
                <label for="event_start">To</label>
              </div>
                <div class="input-field col s6">
                  <input type="text" class="timepicker" placeholder="Time" id="event_time_end" >
                <label for="event_time_end">Time</label>
                </div>

                <!-- <button class="btn waves-effect waves-light" type="submit" name="action">Submit<i class="material-icons right">send</i>
                </button> -->
            
          </form>
      </section>
      <section>
        <h4> Event Table </h4> 

        <table class= "responsive-table striped centered">
          <thead>
            <tr>
                <th>Time</th>
                <th>Camera</th>
                <th>Type</th>
                <th>Message</th>
                <th>Media</th>
            </tr>
          </thead>

            <tbody>
              <tr>
                <td>2017-08-14 <br> 07:24:38</td>
                <td>Camera 39</td>
                <td>Face Detection</td>
                <td>I saw a face :)</td>
                <td>Media Button</td>
              </tr>
              <tr>
                <td>2017-08-14 <br> 07:24:38</td>
                <td>ZM</td>
                <td>Object Detection</td>
                <td>Vehicle detected</td>
                <td>Media Button</td>
              </tr>
              <tr>
                <td>2017-08-14 <br> 07:24:38</td>
                <td>Camera 39</td>
                <td>Line Detection</td>
                <td>Something crossed #1</td>
                <td>Media Button</td>
              </tr>
              <tr>
                <td>2017-08-14 <br> 07:24:38</td>
                <td>Camera 39</td>
                <td>Face Detection</td>
                <td>I saw a face</td>
                <td>Media Button</td>
              </tr>
            </tbody>
          </table>
            
      </section>
      
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">OK</a>
    </div>
  </div>
