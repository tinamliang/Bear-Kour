export default class Timer
{

    scene
    
    label 

    timerEvent

    duration = 0

    constructor(scene, label)
    {
        this.scene = scene;
        this.label = label
    }

    start(callback, duration = 30000)
    {

        this.finishedCallback = callback
        this.duration = duration

		// create a TimerEvent with given duration
		this.timerEvent = this.scene.time.addEvent({
			delay: duration,
			callback: () => {
				this.label.text = '0:00' // set to 0 since time is up

				this.stop()
				
				// execute callback when finished
				if (callback)
				{
					callback()
				}
			}
		})

    }

    stop()
    {
        if (this.timerEvent)
		{
			this.timerEvent.destroy()
			this.timerEvent = undefined
		}
    }

    update()
	{
		if (!this.timerEvent || this.duration <= 0)
		{
			return
		}

		const elapsed = this.timerEvent.getElapsed()
		const remaining = this.duration - elapsed
		var seconds = remaining / 1000
		seconds = seconds.toFixed(0);

		var minutes = Math.floor(seconds/60);
        var partInSeconds = seconds % 60;
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        this.label.text = minutes + ":" + partInSeconds;

		//this.label.text = seconds.toFixed(2)
	}
}
